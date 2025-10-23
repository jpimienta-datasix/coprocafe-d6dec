
' **********************************************************
' **  GENERACIÓN de los CONTRATOS Diarios (Click&DECiDE)  **
' **           (VENTAS, COMPRAS, OFERTAS)                 **
' *                    CnD v13.0.6                         *
' **********************************************************
' versión: 20170217
' última modificación: 20170217
' autor: jpimienta@datasix.es 
' web: http://www.datasix.es
'
' ~~~~~
' NOTA: Guardarlo como "UTF-8 con BOM" para evitar caracteres extraños en los INSERT INTO que haya acentos.
' ~~~~~


'***********
' Variables 
'***********
Dim oCnd
Dim oOI
Dim oQs
Dim oPI
Dim oEOI
Dim oRpt
Dim oQry
Dim oDta
Dim oPrj
Dim sPrj
Dim sRpt
Dim sQry
Dim oPrm
Dim sUsr
Dim sPwd
Dim sSrc
Dim Tini

Dim sPth 'Directorio base
Dim sPthD 'Directorio dónde dejar los Diarios (PDFs, XLSX)
Dim oFSO

Dim bShowSQL
Dim nPDFs

Dim sT
Dim sPT
Dim sToday 'Día de hoy

'sUsr="d6dec"
'sPwd="DSD23824464"
sUsr="usrcop"
sPwd="usrcop"
sSrc="INFOCOP"
'sSrcOut="INFOCOP_OUT"

'sPth="C:\_Clientes\Coprocafe\D6DEC\www\"
sPth="C:\apps\D6DEC\www\"
sPthD= sPth & "\diarios\"
Tini=Time
'On Error Resume Next

'***********
' Principal
'***********
Set oCnd=WScript.CreateObject("Vision.Application")
Set oFSO=WScript.CreateObject("Scripting.FileSystemObject")
nErr=chkErr("[CreateObject]")
AddLog "Inicio... "

sPrj=sPth & "cnd\D6DEC.wfv"
Set oPrj=oCnd.GetProject
oPrj.Open sPrj
nErr=chkErr("[Open:" & sPrj & "]")
oPrj.SetLogin sSrc,sUsr,sPwd
nErr=chkErr("[SetLogin]")
oPrj.SetLogin sSrcOut,sUsr,sPwd
nErr=chkErr("[SetLogin OUT]")
''
' Extracción a INFOCOP.dbo.D6DEC_CONTRATOSxDIA
''
'sQry="Listado de CONTRATOS por dia"
'Set oQry=oPrj.Queries(sQry)
'nErr=chkErr(sQry)
'sToday=Date
'Set oEOI=oPrj.ExportOutputInfos()
'oEOI.OutputAlias = "INFOCOP_OUT"
'oEOI.Filename = "INFOCOP.dbo.D6DEC_CONTRATOSxDIA"
'oEOI.TopicName = "Drop"       
'oEOI.QuietMode = True
'oEOI.WndParent = 0
'oPrj.Export oQry,oEOI
'nErr=chkErr("[Export '" & sQry & "']")
sToday=CStr(Year(Date)) & "-" & Iif(Month(Date)<10,"0","") & CStr(Month(Date)) & "-" & Iif(Day(Date)<10,"0","") & CStr(Day(Date))
sToday="2016-12-20"
AddLog "INFORMES para el día: " & sToday
''
' Generación del informe diario de VENTAS
''
AddLog "Generación informe diario: VENTAS"
genINFDIARIO "V", sToday, "VENTAS_" & date2AAAAMMDD(sToday) & ".pdf"
genXLSXDIARIO "V", sToday, "VENTAS_" & date2AAAAMMDD(sToday) & ".xlsx"

''
' Generación del informe diario de COMPRAS
''
AddLog "Generación informe diario: COMPRAS"
genINFDIARIO "C", sToday, "COMPRAS_" & date2AAAAMMDD(sToday) & ".pdf"
genXLSXDIARIO "C", sToday, "COMPRAS_" & date2AAAAMMDD(sToday) & ".xlsx"

''
' Generación del informe diario de OFERTAS
''
AddLog "Generación informe diario: OFERTAS"
genINFDIARIO "O", sToday, "OFERTAS_" & date2AAAAMMDD(sToday) & ".pdf"
genXLSXDIARIO "O", sToday, "OFERTAS_" & date2AAAAMMDD(sToday) & ".xlsx"

AddLog "Fin PDFs! en " & DateDiff("s",Tini,Time) & " segundos."
'MsgBox "Fin: " & sPth & "pdf\pruebas_vbs\" & qsN

Set oPI=Nothing
Set oPrm=Nothing
Set oRpt=Nothing
Set oPrj=Nothing
Set oFSO=Nothing
Set oCnd=Nothing


'***********
' Funciones
'***********
Sub genINFDIARIO (sT, sTD ,sPDF)
	sRpt="CONTRATOS por dia"
	Set oRpt=oPrj.Reports(sRpt)
	nErr=chkErr("[Report:" & sRpt & "]")
	Set oPrm=oRpt.Parameters(0)
	nErr=chkErr("[Parameters]")
	oPrm("p_T").Value=sT
	nErr=chkErr("[Parameter: p_T=" & sT & "]")
	oPrm("p_FECHA").Value=sTD
	nErr=chkErr("[Parameter: p_FECHA=" & sTD & "]")
	Set oPI=oPrj.PrintInfos()
	oPI.FormatPDF = True
	oPI.PrintToFile = True
	oPI.QuietMode = True   
	' To get All pages
	oPI.FromPage = 1
	oPI.ToPage = -1	 '(all)
	oPI.OutFileName = sPthD & sPDF
	oPrj.d7Print oRpt, oPI
	nErr=chkErr("[d7Print]")
	if nErr=0 Then
		AddLog "(" & sT & ") " & sPthD & sPDF & " > CORRECTO!"
	Else
		AddLog "[!] (" & sT & ") " & sPthD & sPDF & " > ERROR!"
	End If
End	Sub

Sub genXLSXDIARIO (sT, sTD ,sXLSX)
	sQry="CONTRATOS por dia"
	Set oQry=oPrj.Queries(sQry)
	nErr=chkErr("[Query:" & sQry & "]")
	Set oPrm=oQry.Parameters(0)
	nErr=chkErr("[Parameters]")
	oPrm("p_T").Value=sT
	nErr=chkErr("[Parameter: p_T=" & sT & "]")
	oPrm("p_FECHA").Value=sTD
	nErr=chkErr("[Parameter: p_FECHA=" & sTD & "]")
	Set oEOI=oPrj.ExportOutputInfos()
	oEOI.OutputAlias = "Excel XLSX"
	oEOI.Filename = sPthD & sXLSX
	oEOI.TopicName = "A1[ERASESHEET]"       
	oEOI.QuietMode = True
	oEOI.WndParent = 0
	oPrj.Export oQry,oEOI
	nErr=chkErr("[Export]")
	if nErr=0 Then
		AddLog "(" & sT & ") " & sPthD & sXLSX & " > CORRECTO!"
	Else
		AddLog "[!] (" & sT & ") " & sPthD & sXLSX & " > ERROR!"
	End If
End	Sub

Function chkErr(t)
	If Err<>0 Then
		AddLog "Flag: " & t & vbcrLF & "Result: ERROR" & vbcrLF & "Message: " & Err.Description  ,"ERROR"
	End If
	chkErr=Err
End Function

Function getAAAAMMDD()
	getAAAAMMDD = CStr(Year(Now)*10000+Month(Now)*100+Day(Now))
End Function

Function date2AAAAMMDD(f)
	date2AAAAMMDD=Left(f,4) & Mid(f,6,2) & Left(f,2)
End Function

Sub AddLog (t)
Dim sPthLg, oFSO, oLg
	sPthLg = sPth & "log\CnDCONTRATOSDiarios_" & getAAAAMMDD() & ".log.txt"
	Set oFSO = WScript.CreateObject("Scripting.FileSystemObject")
	Set oLg = oFSO.OpenTextFile(sPthLg,8,True)
	oLg.Write Time & " [vbs]> " & t & vbCrLf
	oLg.Close
	Set oLg = Nothing
	Set oFSO = Nothing
End Sub

Function Iif(c,t,f)
	If c then Iif=t else Iif=f
End Function
