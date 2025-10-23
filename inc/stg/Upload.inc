<%
'Source: http://thinketg.com/classic-asp-a-method-of-using-form-variables-with-the-file-upload-control/

' The Function to be used is FormDataElementInformation
' all other Functions are helper Functions and would be
' encapsulated in an OOO environment.
' This type of Functionality is necessary where file information
' is passed by form, which necessiates the form to be passed
' with enctype="multipart/form-data"; this causes the standard
' request.form() object to not work as normally expected
' to where form variables would be visible.  This include file
' includes the routines FormDataElementInformation and
' IterateAllFormElementNames to get around this issue.
' Note if this set of routines is included, no other calls
' to the Request.Form object should be made on the
' parent page; all information should be derived from
' FormDataElementInformation or IterateAllFormElementNames
' IterateAllFormElementNames returns an array of passed
' form variables, or empty if none.
' FormDataElementInformation returns information on a
' passed form variable.
' First parameter is the form variable name requested,
' second argument is the type of value information to
' return, examples:
' name - name of variable
' value - string contents of variable, including file contents
' isfile - boolean true/false if this is a file variable
' filename - file name passed of the file variable
' Examples:
' FormDataElementInformation("up","value") returns the string
' contents in the "up" form variable.
' FormDataElementInformation("up","isfile") returns true or false
' as to whether "up" contains string file contents
' FormDataElementInformation("up","filename") returns
' the file name passed through "up" (if this is a file form variable)
' FormDataElementInformation("up","name") returns
' the name of the form variable "up"; which is "up"
Function BinaryToStringStream(byref Binary)
            dim strString
            strString = ""
    const adTypeText = 2
    const adTypeBinary = 1
    dim oStream
    set oStream = Server.CreateObject("ADODB.Stream")
    with oStream
                        on error resume next
        .Type = adTypeBinary
        .Open
        .Write Binary
        .Position = 0
        .Type = adTypeText
        .CharSet = "us-ascii"
        if err.number = 0 then strString = .ReadText
        if .State = 1 then .Close
        err.Clear
    end with
    BinaryToStringStream = strString
End Function


Function GetFormVariableData
    dim binData, strData
    binData = Request.BinaryRead(Request.TotalBytes)
    strData = BinaryToStringStream(binData)
    GetFormVariableData = strData
End Function

Function GetFormRequestBoundry
    dim strBoundry, lPosition
    strBoundry = Request.ServerVariables("HTTP_CONTENT_TYPE")
    lPosition = instr(1,strBoundry,"boundary=") + len("boundary=")
    GetFormRequestBoundry = mid(strBoundry,lPosition)
End Function

Function ArrayFormRequestData
    dim strData
    strData = GetFormVariableData
    dim strBoundry
    strBoundry = GetFormRequestBoundry
    ArrayFormRequestData = split(strData,"" & strBoundry)
End Function

dim arrAllFormData

Sub  PullFormData
    ' pulls in form data if a form is passed by multipart/form-data
    ' which allows form variables to be used with file controls
    ' Returns a single dimensional array, each element contains
    ' a separate 4 dim array within which are:
    ' 0 : variable name
    ' 1 : variable value
    ' 2 : boolean contains a file element 1 would be the text contents thereof
    ' 3 : file name passed
    dim arrData
    dim strData, strName, strValue, bIsFile, strFileName
    dim processedSubData, arrOut(), counterArray
    arrData = ArrayFormRequestData
    counterArray = -1
    if isarray(arrData) then
                for each SubData in arrData
                            processedSubData = ProcessFormRequestElement(SubData)
                            if isarray(processedSubData) then
                                        counterArray = counterArray + 1
                                        redim preserve arrOut(counterArray)
                                        arrOut(counterArray) = processedSubData
                            end if
                next
    end if
    if isarray(arrOut) then arrAllFormData = ArrayFormRequestData
End Sub  

Function IterateAllFormElementNames
    if not isarray(arrAllFormData) then PullFormData
    dim arrOut(), counterOut
    if isarray(arrAllFormData) then
                counterOut = -1
                for each arrElement in arrAllFormData
                            counterOut = counterOut + 1
                            redim preserve arrOut(counterOut)
                            arrOut(counterOut) = arrElement(0)
                next
                IterateAllFormElementNames = arrOut
    end if
End Function

Function FormDataElementInformation(strVariableName,strTypeOfData)
    if not isarray(arrAllFormData) then PullFormData
    dim elementNumberToPull,strOut
    select case lcase(strTypeOfData)
                case "name" : elementNumberToPull = 0
                case "value" : elementNumberToPull = 1
                case "isfile" : elementNumberToPull = 2
                case "filename" : elementNumberToPull = 3
    end select
    dim arrElement
    if isarray(arrAllFormData) then
                for each arrElement in arrAllFormData
                            if lcase(strVariableName) = lcase(arrElement(0)) then
                                        strOut = arrElement(elementNumberToPull)
                                        exit for
                            end if
                next
    else
                strOut = ""
    end if
    FormDataElementInformation = strOut
End Function

Function ProcessFormRequestElement(strData)
    dim strName, strValue, bIsFile, strFileName
    dim arrLines, strLine
    arrLines = split(strData, vbCrLf)
    dim bContentTypeGiven, bPastFirstBlankDataLine, bNameFound
    bIsFile = false : bContentTypeGiven = false : bPastFirstLine = false : bNameFound = false
    strValue = "":strName = "":strValue="":strFileName=""
    bPastFirstBlankDataLine = false
    for each strLine in arrLines
                if bPastFirstBlankDataLine then
                            strValue = strValue & strLine & vbCrLf
                else
                            if bNameFound and not bIsFile then
                                        bPastFirstBlankDataLine = true
                            elseif bNameFound and bIsFile and bContentTypeGiven then
                                        bPastFirstBlankDataLine = true
                            elseif bIsFile and not bContentTypeGiven then
                                        bContentTypeGiven = left(strLine,len("Content-Type:")) = "Content-Type:"
                            end if
                            if left(strLine,len("Content-Disposition: form-data")) = "Content-Disposition: form-data" then
                                        if strName = "" then
                                                    strName = replace(FindValueInList(strLine,"name","; ","="),"""","",1,-1,1)
                                                    bNameFound = strName <> ""
                                        end if
                                        if strFileName = "" then
                                                    strFileName = FindValueInList(strLine,"filename","; ","=")
                                                    bIsFile = strFileName <> ""
                                        end if
                            end if
                end if
    next
    if right(strValue,len ("--" & vbCrLf)) = "--" & vbCrLf then
                strValue = left(strValue, len(strValue) - len ("--" & vbCrLf))
    end if
    if right(strValue,len (vbCrLf)) = vbCrLf then
                strValue = left(strValue, len(strValue) - len (vbCrLf))
    end if
    dim arrOut(3)
    if bNameFound then
                arrOut(0) = strName
                arrOut(1) = strValue
                arrOut(2) = bIsFile
                arrOut(3) = strFileName
                ProcessFormRequestElement = arrOut
    end if
End Function

Function FindValueInList(listofItems,byval keyToFind,listSeparator,valueSeparator)
' finds a value for an item in a list, the list separated by listSeparator and
' the value from its item by a value separator.  For example, in this string:
' findValue("test1=5;test2=7","test2",";","=") equals 7
    dim lastItem,counterItem
    dim allValues
    dim itemOut
    dim singleLine
    itemOut = ""
    allValues = split(listOfItems,listSeparator)
    lastItem = ubound(allValues)
    itemToFind = trim(ucase(keyToFind))
    for counterItem = 0 to lastItem
                singleLine = split(allValues(counterItem),valueSeparator)
                if ubound(singleLine) > 0 then ' this is an item/value combination
                            if itemToFind = ucase(trim(singleLine(0))) then
                                        itemOut = singleLine(1)
                                        exit for
                            end if
                end if
    next
    FindValueInList = itemOut
End Function
Function MultiPartFormInRequestCollection(RequestVar,MatchThis)
' determines if an item exists in a form variable; used to determine
' if an option in a select control has already been selected.
            dim RequestItem
            dim MatchFound
            MatchFound = false
            RequestItem = "," & replace(FormDataElementInformation(RequestVar,"value"),", ",",") & ","
MultiPartFormInRequestCollection=instr(1,RequestItem,"," & MatchThis & ",",1)>0    
End Function

'For troubleshooting purposes, you might want to have a handy Function to spit out all your new form variables
Sub  MultiPartFormPrintRequestObjects
    dim itm
    ' This Sub  is useful for displaying the
    ' information sent to a page via the request object
    Response.Write "<table border=""1"" cellpadding=""3"">" & vbcrlf & _
                   "<tr valign=""top""><td>" & vbcrlf & _
                   "<table border=""1"">" & vbcrlf & _
                   "<tr><td colspan=""2""><b>Request.Form</b></td></tr>" & vbcrlf
    if isarray(arrAllFormData) then
        for each arrElement in arrAllFormData
            Response.Write "<tr>" & vbcrlf & _
                        "<td>" & OutHtml(arrElement(0)) & "</td>" & vbcrlf & _
                        "<td>" & OutHtml(arrElement(1)) & "</td>" & vbcrlf & _
                        "</tr>" & vbcrlf
        next
    else ' no form data
        Response.Write "<tr>" & vbcrlf & _
                        "<td colspan='2'></td>" & vbcrlf & _
                        "</tr>" & vbcrlf
    end if
    Response.Write "</table>" & vbcrlf & _
                   "</td><td>" & vbcrlf & _
                   "<table border=""1"">" & vbcrlf & _
                   "<tr><td colspan=""2""><b>Request.QueryString</b></td></tr>" & vbcrlf
    for each itm in Request.QueryString 
        Response.Write "<tr>" & vbcrlf & _
                       "<td>" & outHtml(itm) & "</td>" & vbcrlf & _
                       "<td>" & outHtml(Request.QueryString(itm).item) & "</td>" & vbcrlf & _
                       "</tr>" & vbcrlf
    next
    Response.Write  "</td></tr>" & vbcrlf & _
                    "</table></table>" & vbcrlf
End Sub  

Function outHTML(byval strToFix)
    if isnull(strToFix) then strToFix = ""
    strToFix = replace(strToFix,"&nbsp;","~+~",1,-1,1)
    strToFix = replace(strToFix,"&","&amp;",1,-1,1)
    strToFix = replace(strToFix,">","&gt;",1,-1,1)
    strToFix = replace(strToFix,"<","&lt;",1,-1,1)
    strToFix = replace(strToFix,chr(10),"",1,-1,1)
    strToFix = replace(strToFix,chr(13),"",1,-1,1)
    strToFix = replace(strToFix,"~+~","&nbsp;",1,-1,1)
    strToFix = replace(strToFix,chr(9),"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",1,-1,1)
    if trim(strToFix) = "" then strToFix = "&nbsp;"
    outHTML = strToFix
End Function

' Source: http://www.motobit.com/tips/detpg_read-write-binary-files/
Function SaveBinaryData(FileName) 
', ByteArray)
  Const adTypeBinary = 1
  Const adSaveCreateOverWrite = 2
  
  'Create Stream object
  Dim BinaryStream
  Set BinaryStream = CreateObject("ADODB.Stream")
  
  'Specify stream type - we want To save binary data.
  BinaryStream.Type = adTypeBinary
  
  'Open the stream And write binary data To the object
  BinaryStream.Open
  BinaryStream.Write Request.BinaryRead(Request.TotalBytes) 'ByteArray
  
  'Save binary data To disk
  BinaryStream.SaveToFile FileName, adSaveCreateOverWrite
End Function
%>