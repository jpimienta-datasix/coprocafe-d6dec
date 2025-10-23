<%
' 
' **     MOTOR PARA D6DEC      *
' *  DataEntry para Contratos  *
' ******************************
' versión: 20151217
' modificación: 20170208
' autor: jpimienta@datasix.es 
' web: http://www.datasix.es
'
'
' ASPJSON (https://code.google.com/p/aspjson/)
' JSON_2.0.4.asp
' JSON_UTIL_0.1.1.asp
'
' DEBUGGING Classic ASP with FirePHP (https://github.com/dmeagor/ClassicASP-FirePHP) 
' firedebug.inc
'
'
' ~~~~~
' NOTA: Guardarlo como "UTF-8 con BOM" para evitar caracteres extraños en los INSERT INTO que haya acentos.
' ~~~~~
%>

<!--#include file="inc\JSON_2.0.4.asp"-->
<!--#include file="inc\JSON_UTIL_0.1.1.asp"-->
<!--#include file="inc\firedebug.inc" -->

<%
Response.CharSet = "utf-8"
%>

<%
Dim oCnx		'Conexión (OBJ)
Dim sCnxStr		'Cadena de conexión a SQL Server
Dim sQS 		'Request.QueryString
Dim aQS			'Array del QueryString
Dim sQSa 		'Argumento del QueryString (elementos entre "&")
Dim sOutput 	'Cadena devuelta por engine.asp
Dim sErr 		'Cadena de error
Dim sqlORD		'Ordenación en el SQL
dIM sFlds		'Campos para el SQL
Dim nRIni		'Número de registro inicial del resultado SQL (para jTable: jtStartIndex+1)
Dim nRFin		'Número de registro final del resultado SQL (para jTable: jtStartIndex+1+jtPageSize)
Dim sRfr 		'Contiene el link que ha llamado a este ASP
Dim sPthDocs    'Path dónde se encuentran los Documentos (PDFs de los contratos)

'sUsrSQL = "datasix" 
'sPwdSQL = "datasix"
'sSQLSrv = "D6WSSW2K8\SQLEXPRESS"
sCnxStr = Application("sCnxStr")
'sCnxStr = "Provider=SQLNCLI;Server=" & sSQLSrv & ";Database=SIMI;Uid=" & sUsrSQL & ";Pwd=" & sPwdSQL & ";"
'sCnxStr = "Provider=SQLNCLI10;Server=" & sSQLSrv & ";Database=SIMI;Trusted_Connection=yes;"

Function ReadTBL(sTxt, sSQL, bRC)
Dim oJSON
Dim nTRC		'TotalRecordCount
Dim sSQL_TRC	'SQL para obtener TotalRecordsCount
Dim sErr
On Error Resume Next

	Set oCnx = Server.CreateObject("ADODB.Connection")
	oCnx.Open sCnxStr
	''
	'log "oCnx.State: " & oCnx.State 
	''
	Set oJSON = jsObject() 'ASPJON
    If bRC Then
        sSQL_TRC = GetTotalRecordCountSQL(sSQL)	'Se cambian los campos por COUNT(*)
        ''
        log "sSQL_TRC: " & sSQL_TRC
        ''
        Set oRS = oCnx.Execute(sSQL_TRC)
        nTRC = oRS.Fields(0).Value
        If InStr(sSQL,"TOP")>0 Then 
            nSQLTOP = InStr(sSQL,"TOP ")
            nBlnk1 = InStr(nSQLTOP,sSQL," ")
            nBlnk2 = InStr(nBlnk1+1,sSQL," ")
            strTOP=Mid(sSQL, nBlnk1+1, nBlnk2-nBlnk1-1)
            log "nSQLTOP: " & nSQLTOP & " / nBlnk1: " & nBlnk1 & " / nBlnk2: " & nBlnk2 & " / strTOP: " & strTOP
            log "SQL (50 chrs): " & Mid(sSQL,1,50) & " [strTOP=Mid(sSQL, nBlnk1+1, nBlnk2-nBlnk1-1)]"

        End If
        oJSON("nTRC")=nTRC
        oJSON("nTOP")=int(strTOP)
        if nTRC>int(strTOP) Then oJSON("TotalRecordCount")=int(strTOP) else oJSON("TotalRecordCount") = nTRC
        Set oRS = Nothing
        'nTRC=19
        oJSON("SQL_TRC") = sSQL_TRC
    End If
	oJSON("Result") = "OK"
	''
	log "ReadTBL sSQL: " & sSQL
	''
	Set oJSON("Records") = QueryToJSON(oCnx, sSQL) 'ASPJSON include
	sErr = ChkErr(sTxt)
	If sErr<>"" Then
		oJSON("Result") = "ERROR"
		oJSON("Message") = sErr
	End If
	oJSON("SQL") = sSQL
	oCnx.Close
	Set oCnx = Nothing
	' >>> log FirePHP
	'log oJSON
	''
	Set ReadTBL = oJSON
End Function


Sub ReadTblCBox ()
Dim oJSON
Dim sErr
On Error Resume Next

	Set oCnx = Server.CreateObject("ADODB.Connection")
	oCnx.Open sCnxStr
	''
	'log "oCnx.State: " & oCnx.State 
	''
	Set oJSON = jsObject() 'ASPJON    
    ''
	log "ReadblCBox sSQL: " & sSQL
	''
	Set oJSON("Records") = QueryToJSON(oCnx, sSQL) 'ASPJSON include
	sErr = ChkErr(sTxt)
	If sErr<>"" Then
		oJSON("Result") = "ERROR"
		oJSON("Message") = sErr
	End If
	oJSON("SQL") = sSQL
	oCnx.Close
	Set oCnx = Nothing
	' >>> log FirePHP
	'log oJSON
	''

End Sub

Function GetTotalRecordCountSQL(sSQL)
	nFrm = InStr(sSQL,"FROM (")
	nWre = InStr(sSQL,"T WHERE")
	If nWre=0 Then nWre = Len(sSQL)
	GetTotalRecordCountSQL = "SELECT COUNT(*) " & Mid(sSQL, nFrm, nWre - nFrm + 2)
End Function

Function MgmTBL (sTxt, sSQL, sKey)
Dim oJSON
Dim nRAff
Dim sErr
On Error Resume Next
    
    sSQL = "SET ANSI_DEFAULTS Off; " & sSQL 'http://www.forosdelweb.com/f87/msg-error-8152-level-16-state-2-line-1-error-bastante-curioso-794899/#post3549762 
	Set oCnx = Server.CreateObject("ADODB.Connection")
	oCnx.Open sCnxStr
	log "MgmTBL sSQL (" & sTxt & "): " & sSQL
	oCnx.Execute sSQL, nRAff
	sErr = ChkErr(sTxt)
	Set oJSON = jsObject() 'ASPJON
	If sErr="" Then
		oJSON("Result") = "OK"
		'If sTxt = "CCNI" Then
		'	Set oJSON("Record") = QueryToJSON(oCnx, "SELECT CDCONCE FROM CDCONCE_OUT WHERE CDCONCE='" & sKey & "' ") 
		'End If
	Else
		oJSON("Result") = "ERROR"
		If nRAff = 0 Then
			oJSON("Message") = "[" & sTxt & "] No se ha modificado ningún registro.<BR/>(" & sErr & ")"
		Else
			oJSON("Message") = sErr
		End If
		log "MgmTBL ERROR: " & sErr
	End If
	oJSON("Post") = Request.Form
	oJSON("QueryString") = Request.QueryString
	oJSON("SQL") = sSQL
	oCnx.Close
	Set oCnx = Nothing
	Set MgmTBL = oJSON
End Function

'Function BuildJSON4jTable(jsn, sErr)
'Dim s
	
'	If sErr="" Then
'		s = "{ ""Result"":""OK"","
'		s = s & """Records"":" & jsn & " }"
'	Else
'		s = "{ ""Result"":""ERROR"","
'		s = s & """Message"":" & sErr & " }"
'	End If
'
'	BuildJSON4jTable = s
'End Function

Function ChkErr(sTxt)
	ChkErr=""
	If Err.Number <> 0 Then 
		ChkErr = "[" & sTxt & "] " & Err.Description
	End If
	Err.Clear
End Function

Function Iif(c, t, f)
	If (c) Then Iif=t else Iif=f
End Function

Function GetVirtualPath (svSN)
Dim aSvSN, sSN
	aSvSN = Split(Request.ServerVariables("SCRIPT_NAME"), "/")
	sSN = aSvSN(UBound(aSvSN))
	GetVirtualPath = Left(svSN, Len(svSN) - Len(sSN))
End Function

Sub CreateDL(sOpt, sRpt, bShare, sAct) 
	'Create Dolhin Lite
	'http://stackoverflow.com/questions/17697924/running-vbs-script-on-server-from-iis-asp
	Set oWSH = Server.CreateObject("WScript.Shell")
	sRtn = oWSH.Run ("cmd.exe /c ""D:\D6WEBAPPS\D6PSWEB\cmd\MAIN_DLPS.cmd " & sOpt & " " & Session.SessionID & " " & bShare & """ ", 0, true)
	sErr = ChkErr(sAct)
	Set oWSH = Nothing
	Set oJSON = jsObject() 'ASPJSON
	If sRtn <> 0 or sErr <> "" Then
		oJSON("Result") = "ERROR"
		oJSON("Message") = "No se ha podido generar el fichero " & sRpt & ".xls para " & Iif(sOpt = 0, "4 meses + 50% Quinto", "5 Meses + 50% Sexto") & ". " & Iif(Len(sErr)>0, "(" & sErr & ")","")
		oJSON("URL") = GetVirtualPath(Request.ServerVariables("SCRIPT_NAME")) & "temp/" & Session.SessionID & "/" & sRpt & ".xls" 
	Else
		oJSON("Result") = "OK"
		If bShare=1 Then 'Si estamos guardando los datos, generando XLS y compartiéndolo...
			oJSON("Message") = "Se ha guardado la información del Pedido Sugerido/Realizable y se ha generado el fichero " & sRpt & ".xls para " & Iif(sOpt = 0, "4 meses + 50% Quinto", "5 Meses + 50% Sexto") & ". " & Iif(Len(sErr)>0, "(" & sErr & ")","")
			'Se puede gestionar el Pedido Sugerido
			oJSON("GestionPS") = "OK"
		End If
		oJSON("URL") = GetVirtualPath(Request.ServerVariables("SCRIPT_NAME")) & "temp/" & Session.SessionID & "/" & sRpt & ".xls" 
	End If
	oJSON("Share") = bShare
	oJSON("CmdReturn") = sRtn
	oJSON.Flush
End Sub

Function FrmDate(d)
	FrmDate = CStr(DatePart("yyyy", d)) & "-" & CStr(DatePart("m", d)) & "-" & CStr(DatePart("d", d)) & " "
	FrmDate = FrmDate & CStr(DatePart("h", d)) & ":" & CStr(DatePart("n", d)) & ":" & CStr(DatePart("s", d))
End Function


Function getAAAAMMDD(d)
	getAAAAMMDD = CStr(Year(d)) & Iif(Len(Month(d))=1,"0","") & CStr(Month(d)) & Iif(Len(Day(d))=1,"0","") & CStr(Day(d))
End Function

' **  Main  **
' ************
'
On Error Resume Next

sQS=Request.QueryString
If Len(sQS) = 0 Then 
            Response.Write "[""Result"":""ERROR"", ""Message"":""NO-PARAMETERS""]"
	Response.End 
End If

aQS=Split(sQS,"&") 
For Each sQSa in aQS 
    sQSi=Split(sQSa,"=") 
    Select Case UCase(sQSi(0))  
    Case "A" 'Action 
        Select Case UCase(sQSi(1)) 
        Case "RTVC" 'ReadTable: listado del histórico para VENTAS / COMPRAS
            pNR=Request.QueryString("NR")
            pC=Request.QueryString("C")
            pC=Iif(pC="ALL","",pC)
            pCP=Request.QueryString("CP")
            pCP=Iif(pCP="ALL","",pCP)
            pQG=Request.QueryString("QG")
            pQG=Iif(pQG="ALL","",pQG)
            pO=Request.QueryString("O")
            pO=Iif(pO="ALL","",pO)
            pQ=Request.QueryString("Q")
            pQ=Iif(pQ="ALL","",pQ)
            pT=Request.QueryString("T")

            sSQLw = Iif(Len(pC)>0, "WHERE Comp='" & pC & "' ", "")
            sSQLw = sSQLw & Iif(Len(pCP)>0, Iif(Len(sSQLw)>0, "AND ", "WHERE ") & "AccNo='" & pCP & "' ", "")             
            sSQLw = sSQLw & Iif(Len(pQG)>0, Iif(Len(sSQLw)>0, "AND ", "WHERE ") & "QualGrpNo='" & pQG & "' ", "")
            sSQLw = sSQLw & Iif(Len(pO)>0, Iif(Len(sSQLw)>0, "AND ", "WHERE ") & "OrigNo='" & pO & "' ", "")
            sSQLw = sSQLw & Iif(Len(pQ)>0, Iif(Len(sSQLw)>0, "AND ", "WHERE ") & "QualNo='" & pQ & "' ", "")
            sqlORD = Iif(Len(Request.QueryString("jtSorting"))=0, "CtrDate DESC", Request.QueryString("jtSorting"))  
            nRIni = CInt(Request.QueryString("jtStartIndex")) + 1 
            nRFin = CInt(Request.QueryString("jtStartIndex")) + CInt(Request.QueryString("jtPageSize"))
            sFlds = "Comp, Ctr, CTRDATE, Origin, OrigNo, Quality, QualNo, QualityGroup, QualGrpNo, OutRightPrice, NetDiff, TotalKg, AccNo, CurrName,  "
            sFlds = sFlds & "AccNo3, Agent, CondCode, Condition, NetStockExch, PriceType, NetFuturesMonth, ShipmDateAAAAMM, OrgBags, Contractor "
            Select Case pT
                case "C": sTabla = "INFOCOP.dbo.D53301PUR"
                case "V": sTabla = "INFOCOP.dbo.D53301"
                case "T": sTabla = "(SELECT " & sFlds & ", 'V' AS CONTRATO_DE FROM INFOCOP.dbo.D53301 UNION ALL SELECT " & sFlds & ", 'C' AS CONTRATO_DE FROM INFOCOP.dbo.D53301PUR) U "
            End Select
            sSQL = "SELECT " & Iif(Len(pNR)>0, "TOP " & pNR & " ", "") & sFlds & Iif(pT<>"T", ", '" & pT & "' AS CONTRATO_DE ", ", CONTRATO_DE ") & " FROM "
            sSQL = sSQL & "( SELECT ROW_NUMBER() OVER (ORDER BY " & sqlORD & ") AS RNum, " & sFlds & Iif(pT="T", ", CONTRATO_DE ", "") & "FROM " & sTabla & " "
            sSQL = sSQL & sSQLw
            sSQL = sSQL & ") T WHERE T.RNum BETWEEN " & nRIni & " AND " & nRFin & " "
            ReadTBL("RTCV", sSQL, true).Flush
        Case "RTCT" 'ReadTable: listado del histórico para CONTRATOS
            pNR=Request.QueryString("NR")
            pC=Request.QueryString("C")
            pC=Iif(pC="ALL","",pC)
            pCP=Request.QueryString("CP")
            pCP=Iif(pCP="ALL","",pCP)
            pQG=Request.QueryString("QG")
            pQG=Iif(pQG="ALL","",pQG)
            pO=Request.QueryString("O")
            pO=Iif(pO="ALL","",pO)
            pQ=Request.QueryString("Q")
            pQ=Iif(pQ="ALL","",pQ)
            pT=Request.QueryString("T")
            sSQLw=""
            'If pT="C" then SQLwCV = "LTrim(Ctr) LIKE '00%' " Else SQLwCV = "LTrim(Ctr) NOT LIKE '00%' "
            SQLwCV = " AND [CONTRATO_DE]='" & pT & "' "    
            sSQLw = Iif(Len(pC)>0, "WHERE Comp='" & pC & "' ", "")
            sSQLw = sSQLw & Iif(Len(pCP)>0, Iif(Len(sSQLw)>0, "AND ", "WHERE ") & "AccNo='" & pCP & "' ", "")                
            sSQLw = sSQLw & Iif(Len(pQG)>0, Iif(Len(sSQLw)>0, "AND ", "WHERE ") & "QualGrpNo='" & pQG & "' ", "")
            sSQLw = sSQLw & Iif(Len(pO)>0, Iif(Len(sSQLw)>0, "AND ", "WHERE ") & "OrigNo='" & pO & "' ", "")
            sSQLw = sSQLw & Iif(Len(pQ)>0, Iif(Len(sSQLw)>0, "AND ", "WHERE ") & "QualNo='" & pQ & "' ", "")
            sqlORD = Iif(Len(Request.QueryString("jtSorting"))=0, "CtrDate DESC", Request.QueryString("jtSorting"))  
            nRIni = CInt(Request.QueryString("jtStartIndex")) + 1 
            nRFin = CInt(Request.QueryString("jtStartIndex")) + CInt(Request.QueryString("jtPageSize"))
            'sFlds = "Comp, Ctr, CtrDate, Origin, OrigNo, Quality, QualNo, QualityGroup, QualGrpNo, OutRightPrice, NetDiff, TotalKg, AccNo, CurrName  "
            sFlds = "*"
            sSQL = "SELECT " & Iif(Len(pNR)>0, "TOP " & pNR & " ", "") & sFlds & " FROM "
            sSQL = sSQL & "( SELECT ROW_NUMBER() OVER (ORDER BY " & sqlORD & ") AS RNum, " & sFlds & " FROM INFOCOP.dbo.D6DEC_CONTRATOS T1 " & sSQLw
            sSQL = sSQL & Iif(Len(sSQLw)>0,"AND ", "WHERE ") & " [Ctr]+[MODIFICACION] = ( SELECT MAX([Ctr]+[MODIFICACION]) FROM [INFOCOP].[dbo].[D6DEC_CONTRATOS] T2 WHERE T2.[Ctr]=T1.[Ctr]) " & Iif(pT="T","",SQLwCV)
            sSQL = sSQL & ") T WHERE T.RNum BETWEEN " & nRIni & " AND " & nRFin 
            ReadTBL("RTCT", sSQL, true).Flush
        Case "RCBCP" 'ReadComboBox: Listado de Clientes/Proveedores   
            pT=Request.QueryString("T") 'D: cliente / K: Proveedor (Campo TYPE) o T: para todos
            sFType=Iif(pT="T","'CLIENT','TRADER','CUSTOMER','GROUP','NON-GROUP'",Iif(pT="D", "'CLIENT','TRADER','CUSTOMER'", "'GROUP','NON-GROUP'"))
            pC=Request.QueryString("C")
            pDWT=Request.QueryString("DWT") ' Si es para Clientes/Proveedores cuando el TIPO-CONTRATO es DESCAFEINADOS y WATER TREATED: 3925800 y 1003400
            sFlds = "DISTINCT ACCOUNT AS [Value], NAMECO " & Iif(pC="Y", "+ ' (' + ACCOUNT + ')'", "" ) & " AS [Option] "
            sSQL = "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[CLIENTES-PROVEEDORES] WHERE TYPE_C_S IN (" & sFType & ") "
            If pDWT="Y" Then sSQL = sSQL & "AND ACCOUNT IN ('3925800','1003400') "
            'sSQL = sSQL & IIF(Len(pT)>0, "AND TYPE='" & pT & "' ", "")
            sSQL = sSQL & "ORDER BY 2"
            ReadTBL("RCBCP", sSQL, false).Flush
        Case "RCBQG" 'ReadComboBox: Listado de QualityGroup   
            pC=Request.QueryString("C")
            sFlds = "DISTINCT QUAL_GRP_NO as [Value], QUAL_GRP " & Iif(pC="Y", "+ ' (' + QUAL_GRP_NO + ')'", "" ) & " AS [Option] "
            sSQL = "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[AGRUPACION-ORIGENES] "
            sSQL = sSQL & "ORDER BY 2"
            ReadTBL("RCBQG", sSQL, false).Flush
        Case "RCBOR" 'ReadComboBox: Listado de Origin  
            pC=Request.QueryString("C")
            pQG=Request.QueryString("QG")    
            pQG=Iif(pQG="ALL","",pQG)            
            sFlds = "DISTINCT ORIGIN_NO as [Value], ORIGIN " & Iif(pC="Y", "+ ' (' + ORIGIN_NO + ')'", "" ) & " AS [Option] "
            sSQL = "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[AGRUPACION-ORIGENES] "
            sSQL = sSQL & IIF(Len(pQG)>0, "WHERE QUAL_GRP_NO=" & pQG & " ", "")            
            sSQL = sSQL & "ORDER BY 2"
            ReadTBL("RCBOR", sSQL, false).Flush
        Case "RCBQL" 'ReadComboBox: Listado de Quality 
            pC=Request.QueryString("C")
            pO=Request.QueryString("O")
            pO=Iif(pO="ALL","",pO)            
            pQG=Request.QueryString("QG")
            pQG=Iif(pQG="ALL","",pQG)            
            sFlds = "DISTINCT QUAL_NO as [Value], QUALITY " & Iif(pC="Y", "+ ' (' + QUAL_NO + ')'", "" ) & " AS [Option] "
            sSQL = "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[AGRUPACION-ORIGENES] "
            sSQL = sSQL & IIf(Len(pO)>0 or Len(pQG)>0,"WHERE ","")
            sSQL = sSQL & IIF(Len(pO)>0, "ORIGIN_NO=" & pO & " ", "")
            sSQL = sSQL & IIF(Len(pO)>0 and Len(pQG)>0, "AND ", "")
            sSQL = sSQL & IIF(Len(pQG)>0, "QUAL_GRP_NO=" & pQG & " ", "")            
            sSQL = sSQL & "ORDER BY 2"
            ReadTBL("RCBQL", sSQL, false).Flush
        Case "RCBCE" 'ReadComboBox: Listado de Condiciones Entrega 
            sFlds = "DISTINCT Condition as [Value], Condition AS [Option], orden "
            sSQL = "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[D6DEC_CONDICION-ENTREGA] "
            sSQL = sSQL & "ORDER BY 3"
            ReadTBL("RCBCE", sSQL, false).Flush
        Case "RCE" 'Read Condición Entrega 
            pCC=Request.QueryString("C")
            sFlds = "Condition  "
            sSQL = "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[D6DEC_CONDICION-ENTREGA] "
            sSQL = sSQL & "WHERE CondCode=" & pCC
            ReadTBL("RCE", sSQL, false).Flush   
        Case "RCDE" 'Read CondCode (código Condición Entrega para Condition+Peso)
            pC=Request.QueryString("C")
            pP=Request.QueryString("P")
            sFlds = "CondCode  "
            sSQL = "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[D6DEC_CONDICION-ENTREGA] "
            sSQL = sSQL & "WHERE Condition='" & pC & "' and Peso='" & pP & "'"
            ReadTBL("RCDE", sSQL, false).Flush   
        Case "RCBML" 'ReadComboBox: Listado de Marco Legal 
            sFlds = "DISTINCT ID as [Value], MARCO_LEGAL AS [Option] "
            sSQL = "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[D6DEC_MARCO-LEGAL] "
            ReadTBL("RCBML", sSQL, false).Flush
        Case "RCBI","RCBOC" 'ReadComboBox: Listado de Intermediario / Otras Comisiones
            sFlds = "DISTINCT ACCOUNT as [Value], NAMECO AS [Option] "
            sSQL = "SELECT '' AS [Value], '' AS [Option] UNION "
            sSQL = sSQL & "SELECT '0' AS [Value], '' AS [Option] UNION "
            sSQL = sSQL & "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[AGENTES] "
            sSQL = sSQL & "WHERE TYPE='K' AND TYPE_C_S<>'CERRADO' "
            sSQL = sSQL & "ORDER BY 2"
            ReadTBL("RCBI", sSQL, false).Flush
        Case "RCBU" 'ReadComboBox: Listado de Unidades (Moneda/Peso) 
            pM=Request.QueryString("M")
            pMd=Iif(Request.QueryString("MD")="T",true,false)
            'sSQL = "SELECT DISTINCT CURRCODE AS [Value], CURR_PER AS [Option] "
            'sSQL = sSQL & "FROM (SELECT  CURRCODE, CURR_PER FROM [INFOCOP].[dbo].[D53301] "
            'sSQL = sSQL & "UNION SELECT  CURRCODE, CURR_PER FROM [INFOCOP].[dbo].[D53301PUR]) T "
            'sSQL = sSQL & " WHERE CURR_PER NOT IN ('USD/1000KGS','USD/100LBS') "
            sSQL = "SELECT ID AS [Value], UNIDAD AS [Option] "
            sSQL = sSQL & "FROM [INFOCOP].dbo.[D6DEC_UNIDADES] "
            If pMd Then 'Para Mercado
                If pM="N" Then sSQL = sSQL & "WHERE UNIDAD LIKE 'US cts/lb' " 'New York
                If pM="K" Then sSQL = sSQL & "WHERE UNIDAD LIKE 'EUR/MT' " 'Londres
            Else
                If pM="N" Then sSQL = sSQL & "WHERE UNIDAD LIKE 'U%' " 'New York
                If pM="K" Then sSQL = sSQL & "WHERE UNIDAD LIKE 'E%' " 'Londres
            End If
            sSQL = sSQL & "ORDER BY 2"                
            ReadTBL("RCBU", sSQL, false).Flush
'        Case "RCBSE" 'ReadComboBox: Listado de NetStockExchange 
'            sSQL = "SELECT DISTINCT NetStockExch AS [Value], NetStockExch AS [Option] "
'            sSQL = sSQL & "FROM [INFOCOP].[dbo].[D53301PUR] "
'            sSQL = sSQL & "ORDER BY 2"                
'            ReadTBL("RCBSE", sSQL, false).Flush
        Case "RCBFO" 'ReadComboBox: Listado de Orígenes (Fletes)
            sFlds = "DISTINCT [Port of Loading] as [Value], [Port of Loading] AS [Option] "
            sSQL = "SELECT '' AS [Value], '' AS [Option] UNION "
            sSQL = sSQL & "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[D6DEC_FLETES] "
            sSQL = sSQL & "WHERE Preference=1 "
            sSQL = sSQL & "ORDER BY 2"
            ReadTBL("RCBFO", sSQL, false).Flush
        Case "RCBCO" 'ReadComboBox: Listado de Orígenes (Camión)
            'sSQL = "SELECT '*' AS [Value], 'Falta tabla!!' AS [Option] "
            sFlds = "DISTINCT [Origen] as [Value], [Origen] AS [Option] "
            sSQL = "SELECT '' AS [Value], '' AS [Option] UNION "
            sSQL = sSQL & "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[D6DEC_CAMIONES] "
            sSQL = sSQL & "ORDER BY 2"                
            ReadTBL("RCBCO", sSQL, false).Flush
        Case "RCBFD" 'ReadComboBox: Listado de Destinos (Fletes)
            pO=Request.QueryString("O")
            wDst=" AND [Port of Loading]='" & pO & "' "
            sFlds = "DISTINCT [Destination] as [Value], [Destination] AS [Option] "
            sSQL = "SELECT '' AS [Value], '' AS [Option] UNION "
            sSQL = sSQL & "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[D6DEC_FLETES] "
            sSQL = sSQL & "WHERE Preference=1 " & Iif(Len(pO)>0,wDst,"")
            sSQL = sSQL & "ORDER BY 2"
            ReadTBL("RCBFO", sSQL, false).Flush
        Case "RCBCD" 'ReadComboBox: Listado de Destinos (Camión)
            'sSQL = "SELECT '*' AS [Value], 'Falta tabla!!' AS [Option] "
            pO=Request.QueryString("O")
            wDst=" WHERE [Origen]='" & pO & "' "            
            sFlds = "DISTINCT [Destino] as [Value], [Destino] AS [Option] "
            sSQL = "SELECT '' AS [Value], '' AS [Option] UNION "
            sSQL = sSQL & "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[D6DEC_CAMIONES] " & Iif(Len(pO)>0,wDst,"")
            sSQL = sSQL & "ORDER BY 2"                
            ReadTBL("RCBCD", sSQL, false).Flush
        Case "RTFLT" 'ReadTable: Info de Fletes en función de Origen+Destino
            pO=Request.QueryString("O")
            pD=Request.QueryString("D")
            sFlds = "DISTINCT [Container1], [Descr1], [Oceanfreight 1] as Precio, [Line Name] as Nav "
            sSQL = sSQL & "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[D6DEC_FLETES] "
            sSQL = sSQL & "WHERE Preference=1 AND [Port of Loading]='" & pO & "' AND [Destination]='" & pD & "' "
            ReadTBL("RTFLT", sSQL, false).Flush
        Case "RTFLTC" 'ReadTable: Info de Fletes en función de Origen+Destino y tipo de Container1 (LCL-FCL o FCL-FCL)
            pO=Request.QueryString("O")
            pD=Request.QueryString("D")
            pC=Request.QueryString("C")
            If pC="LCL-FCL" Then pN="2" Else pN="1"
            sFlds = "DISTINCT [Container1], [Descr1], [Oceanfreight " & pN & "] as Precio, [Line Name] as Nav "
            sSQL = sSQL & "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[D6DEC_FLETES] "
            sSQL = sSQL & "WHERE Preference=1 AND [Port of Loading]='" & pO & "' AND [Destination]='" & pD & "' AND [Container1]='" & pC & "'"
            ReadTBL("RTFLTC", sSQL, false).Flush
        Case "RTCAM" 'ReadTable: Info de Camiones en función de Origen+Destino
            pO=Request.QueryString("O")
            pD=Request.QueryString("D")
            sFlds = "DISTINCT [Origen], [Destino], [COSTE1TM], [MONEDA] "
            sSQL = sSQL & "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[D6DEC_CAMIONES] "
            sSQL = sSQL & "WHERE [Origen]='" & pO & "' AND [Destino]='" & pD & "' "
            ReadTBL("RTCAM", sSQL, false).Flush
        Case "RCBQC" 'ReadComboBox: Info de Calidad Cliente
            pQG=Request.QueryString("QG")
            pO=Request.QueryString("O")
            pQ=Request.QueryString("Q")
            pC=Request.QueryString("C")
            sFlds = "DISTINCT [QUALITY_CUST] as [Value], [QUALITY_CUST] as [Option]"
            sSQL = sSQL & "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[D6DEC_CALIDAD-CLIENTE] "
            sSQL = sSQL & "WHERE [QUAL_GRP_NO]='" & pQG & "' AND [ORIGIN_NO]='" & pO & "' AND [QUAL_NO]='" & pQ & "' AND [ACCOUNT]='" & pC & "' "
            ReadTBL("RCQC", sSQL, false).Flush
        Case "RCBCES" 'ReadComboBox: Listado de Condiciones ESpeciales 
            sFlds = "DISTINCT Condition as [Value], Condition AS [Option]"
            sSQL = "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[D6DEC_CONDICIONES-ESPECIALES] "
            ReadTBL("RCBCES", sSQL, false).Flush  
        Case "RCBFF" 'ReadComboBox: Listado de Fechas Fijación Mercado
            pM=Request.QueryString("M")
            pAM=Request.QueryString("AM")
            sFlds = "DISTINCT FECHA_FIJACION as [Value], FECHA_FIJACION AS [Option] "
            sSQL = "SELECT " & sFlds & " FROM [INFOCOP].[dbo].[D6DEC_FECHAS-FIJACION-MERCADO] "
            If (pAM="") Then
                sSQL = sSQL & "WHERE FECHA_FIJACION >= Year(GetDate())*100+Month(GetDate()) and MERCADO='" & pM & "' "
            Else
                sSQL = sSQL & "WHERE FECHA_FIJACION >= " & pAM & " and MERCADO='" & pM & "' "
            End If
            sSQL = sSQL & "ORDER BY 1"          
            ReadTBL("RCBFF", sSQL, false).Flush  
        Case "SVCTTO" 'SaveContrato (Generar Contrato / Generar Oferta)
            'pT=Request.QueryString("T") 'Tipo: Contrato / Oferta
            pF=Request.Form("F") 'Campos
            pV=Request.Form("V") 'Valores
            pU=IIF(Request.ServerVariables("AUTH_USER")<>"", Request.ServerVariables("AUTH_USER"), IIF(Request.ServerVariables("LOGON_USER")<>"", Request.ServerVariables("LOGON_USER"), "NoDefinido"))
            pB=InStr(pU,"\")
            If pB>0 Then pU=Mid(pU,pB+1,Len(pU)-pB)
            sSQLi = "INSERT INTO INFOCOP.dbo.D6DEC_CONTRATOS (" & pF & ",[FECHAHORA_ALTA],[USR]) VALUES (" & pV & ",GetDate(),'" & pU & "')"
            MgmTBL("SVCTTO", sSQLi, "").Flush
        Case "MXCTTO" 'Valor máximo para un tipo de contrato INFOCOP.dbo.D6DEC_CONTRATOS
            pT=Request.QueryString("T")
            sSQL = "SELECT IsNull(MAX(Ctr),'') as MAXCTTO FROM INFOCOP.dbo.D6DEC_CONTRATOS WHERE Ctr LIKE '" & pT & "%'"
            ReadTBL("MXCTTO", sSQL, false).Flush  
        Case "MXCTTOLD" 'Valor máximo para un tipo de contrato en INFOCOP.dbo.[Listado_DOCUMENTACION] (Para cuándo todavía no hay ese tipo de contrato en D6DEC_CONTRATOS)
            pT=Request.QueryString("T")
            pCV=Request.QueryString("CV")
            sW=""
            'Si pT empieza por 003, hay que tener en cuenta qué:
            '- Empezaron por el 0036, por lo que al llegar al 0039, pasaron al 0030 > Así, el valor que hay que buscar es el MAX siempre que el CTR<0036
            If Left(pT,3)="003" Then
                sW = " AND CTR_DOC<'0036' "
                sW2 = " AND CTR<'0036' "
            End If
            If pCV="C" Then
                sSQL = "SELECT MAX(MAXCTTO) as MAXCTTO FROM ("
                sSQL = sSQL & "SELECT IsNull(MAX(CTR_DOC),'') as MAXCTTO FROM INFOCOP.dbo.[Listado_DOCUMENTACION] WHERE CTR_DOC LIKE '" & pT & "%' AND COD_DOC='LHT0' " & sW
                sSQL = sSQL & "UNION "
                sSQL = sSQL & "SELECT IsNull(MAX('00'+CTR),'') as MAXCTTO FROM INFOCOP.dbo.[D53301PUR] WHERE '00'+CTR LIKE '" & pT & "%' " & sW2 & " ) T"
            Else
                sSQL = "SELECT MAX(MAXCTTO) as MAXCTTO FROM ("
                sSQL = sSQL & "SELECT IsNull(MAX(CTR_DOC),'') as MAXCTTO FROM INFOCOP.dbo.[Listado_DOCUMENTACION] WHERE CTR_DOC LIKE '" & pT & "%' AND COD_DOC='LHT0' " & sW
                sSQL = sSQL & "UNION "
                sSQL = sSQL & "SELECT IsNull(MAX(CTR),'') as MAXCTTO FROM INFOCOP.dbo.[D53301] WHERE CTR LIKE '" & pT & "%' " & sW2 & " ) T"
            End If
            ReadTBL("MXCTTOLD", sSQL, false).Flush  
        Case "SVCC" 'Guardar nuevo valor para CALIDAD-CLIENTE
            pQG=Request.QueryString("QG")
            pO=Request.QueryString("O")
            pQ=Request.QueryString("Q")
            pC=Request.QueryString("C")
            pCC=Request.Form("CC")
            sSQLi = "INSERT INTO INFOCOP.dbo.[D6DEC_CALIDAD-CLIENTE] ([QUAL_GRP_NO], [ORIGIN_NO], [QUAL_NO], [ACCOUNT], [QUALITY_CUST]) VALUES ("
            sSQLi= sSQLi & "'" & pQG & "','" & pO & "','" & pQ & "','" & pC & "','" & pCC & "')"
            MgmTBL("SVCC", sSQLi, "").Flush
        Case "MXCTTOM" 'Valor máximo de MODIFICACIÓN para un tipo de contrato INFOCOP.dbo.D6DEC_CONTRATOS
            pC=Request.QueryString("C")
            sSQL = "SELECT MAX(MODIFICACION) AS MODIFICACION FROM INFOCOP.dbo.D6DEC_CONTRATOS WHERE Ctr = '" & pC & "'"
            ReadTBL("MXCTTOM", sSQL, false).Flush  
        Case "CALCE" 'Valores para el Cálculo de las Condiciones de Entrega
            pQG=Request.QueryString("QG")
            pO=Request.QueryString("O")
            sFlds=" [CONVERSION_USD_MT],[TIPO_INT],[FLETE_USD_ES],[MT_CONTENEDOR],[PORCENTAJE_SEGURO],[DIAS_TRAVESIA],[OP_PUERTO],[DESPACHO],[RECEPCION],[P_ENT],[15_ALM] AS _15_ALM,[PORCENTAJE_SEGURO_ALMACEN],[ROTACION_STOCK],[PERIODO_COBRO],[PORCENTAJE_GTOS_BANCARIOS],[GTOS_M_FUTUROS_USD] ,[GTOS_M_FUTUROS_EUR],[PORCENTAJE_GTOS_BR],[PORCENTAJE_SEGURO_RIESGO],[PORCENTAJE_MERMA_DECAF],[TOLLING_DCM_USD],[DIAS_PROCESO_DECAF],[CAMION],[S_ALM],[P_SALIDA],[ESTIBA_CAM],[PALET_EUR_MT],[PALETIZADO_RETRACTILADO_EUR_MT] "
            sSQL="SELECT " & sFlds & " FROM [dbo].[D6DEC_ESCANDALLOS] E "
            sSQL=sSQL & " INNER JOIN "
            sSQL=sSQL & "(SELECT DISTINCT AGRUP_CENSO_NO,AGRUP_CENSO,ORIGIN_NO FROM INFOCOP.dbo.[AGRUPACION-ORIGENES]) AO "
            sSQL=sSQL & "ON E.AgrupCenso = AO.AGRUP_CENSO AND E.OrigNo = AO.ORIGIN_NO WHERE AO.AGRUP_CENSO_NO=" & pQG & " AND E.OrigNo=" & pO
            ReadTBL("CALCE", sSQL, false).Flush
        Case "RDAM" 'Para recuperar ACUEROS y MARGEN de ESCANDALLOS
            pQG=Request.QueryString("QG")
            pO=Request.QueryString("O")
            sFlds="ACUERDOS_USD, MARGEN_EUR_MT, RATE"
            sSQL="SELECT " & sFlds & " FROM [dbo].[D6DEC_ESCANDALLOS] E "
            sSQL=sSQL & " INNER JOIN "
            sSQL=sSQL & "(SELECT DISTINCT AGRUP_CENSO_NO,AGRUP_CENSO,ORIGIN_NO FROM INFOCOP.dbo.[AGRUPACION-ORIGENES]) AO "
            sSQL=sSQL & "ON E.AgrupCenso = AO.AGRUP_CENSO AND E.OrigNo = AO.ORIGIN_NO WHERE AO.AGRUP_CENSO_NO=" & pQG & " AND E.OrigNo=" & pO
            ReadTBL("RDAM", sSQL, false).Flush
        Case "RDFOD" 'FLETES: Para recuperar Origen (Port of Loading) y Destino (Destination) por defecto según ORIGIN
            pO=Request.QueryString("O")
            sSQL="SELECT TOP 1 F.[Port of Loading] AS PortOfLoading,F.Destination "
            sSQL=sSQL & "FROM INFOCOP.dbo.D6DEC_FLETES F INNER JOIN INFOCOP.dbo.[D6DEC_FLETES-ORIGIN] FO "
            sSQL=sSQL & "ON F.COUNTER=FO.COUNTER "
            sSQL=sSQL & "WHERE F.Preference=1 and OrigNo='" & pO & "'"
            ReadTBL("RDFOD", sSQL, false).Flush
        Case "RDCOD" 'CAMIONES: Para recuperar Origen (Port of Loading) y Destino (Destination) por defecto según ORIGIN
            pO=Request.QueryString("O")
            sSQL="SELECT TOP 1 C.ORIGEN,C.DESTINO "
            sSQL=sSQL & "FROM INFOCOP.dbo.D6DEC_CAMIONES C INNER JOIN INFOCOP.dbo.[D6DEC_CAMIONES-ORIGIN] CO "
            sSQL=sSQL & "ON C.ORIGEN=CO.ORIGEN "
            sSQL=sSQL & "WHERE OrigNo='" & pO & "'"
            ReadTBL("RDCOD", sSQL, false).Flush
        Case "GENPDF" 'Generación del contrato en PDF
            pVC=Request.QueryString("VC")
            pPT=Request.QueryString("PT")
            pN=Replace(Request.QueryString("N"),"%20"," ")

            'Crear PDF con Click&DECiDE v13.0.6
            'http://stackoverflow.com/questions/17697924/running-vbs-script-on-server-from-iis-asp
            Set oWSH = Server.CreateObject("WScript.Shell")
            Set oJSON = jsObject() 'ASPJSON
            '1st version: "cmd.exe /c """ & Request.ServerVariables("APPL_PHYSICAL_PATH")  & "\cnd\cndengine.vbs " & pVC & " " & pC & " " & Session.SessionID & " " & pN & """ "
            oJSON("cmd")="cmd.exe /c """ & Request.ServerVariables("APPL_PHYSICAL_PATH")  & "\cnd\cndengine.vbs " & pVC & " " & Session.SessionID & " """ & pN & """ " & pPT & """ "
            AddLog "[GenPDF] cmd.exe /c """ & Request.ServerVariables("APPL_PHYSICAL_PATH")  & "\cnd\cndengine.vbs " & pVC & " " & Session.SessionID & " """ & pN & """ " & pPT & """ "
            log "[GenPDF] cmd: cmd.exe /c """ & Request.ServerVariables("APPL_PHYSICAL_PATH")  & "\cnd\cndengine.vbs " & pVC & " " & Session.SessionID & " """ & pN & """ " & pPT & """ "
            sRtn = oWSH.Run ("cmd.exe /c """ & Request.ServerVariables("APPL_PHYSICAL_PATH")  & "\cnd\cndengine.vbs " & pVC & " " & Session.SessionID & " """ & pN & """ " & pPT & """ ", 0, true)
            oJSON("cmdReturn") = sRtn
            sErr = ChkErr("[GenPDF " & pVC & ", " & Session.SessionID & ", " & pN & "]")
            Set oWSH = Nothing
            If sRtn <> 0 or sErr <> "" Then
                oJSON("Result") = "ERROR"
                oJSON("Message") = "No se ha podido generar el contrato: " & pN 
            Else
                oJSON("Result") = "OK"
                oJSON("Message") = "Se ha creado el contrato: " & pN
            End If
            'oJSON("URL") = GetVirtualPath(Request.ServerVariables("SCRIPT_NAME")) & "pdf/" & Session.SessionID & "/" & pN  
            'oJSON("Path") = GetVirtualPath(Request.ServerVariables("SCRIPT_NAME")) & "pdf/" & Session.SessionID & "/"
            oJSON("URL") = GetVirtualPath(Request.ServerVariables("SCRIPT_NAME")) & "doc/" & pN  
            oJSON("Path") = GetVirtualPath(Request.ServerVariables("SCRIPT_NAME")) & "doc/"
            oJSON.Flush
        Case "SHCTTOS" 'Mostrar documentos del contrato indicado
            lstDocs=""
            pC=Request.QueryString("C") 'Contrato
            Set oJSON=jsObject()'JSON Object
            'Test: 5251001
            Set oFSO=Server.CreateObject("Scripting.FileSystemObject")
            sPthDocs=Replace(Request.ServerVariables("PATH_TRANSLATED"),GetFileName(),"") & "doc"
            Set oFldr=oFSO.GetFolder(sPthDocs)
            For each oFl in oFldr.Files
                If InStr(oFl.Name," " & pC & " ")>0 Then
                    lstDocs=lstDocs & oFl.Name & "|"
                End If
            Next
            Set oFldr=Nothing
            Set oFSO=Nothing
            sErr=ChkErr("[SHCTTOS]")
            If sErr<>"" Then
                oJSON("Result") = "ERROR"
                oJSON("Message") = "No se ha podido recuperar la lista de documentos:<br/>&nbsp;- Dir: " & sPthDocs & "<br/>&nbsp;- " & sErr    
            Else
                if Len(lstDocs)=0 Then
                    oJSON("Result") = "ERROR"
                    oJSON("Message") = "No se han encontrado documentos del contrato " & pC & "."
                Else
                    oJSON("Result") = "OK"
                    oJSON("Docs")=Left(lstDocs,Len(lstDocs)-1)
                End if
                oJSON("PathDocs")=sPthDocs
            End If
            oJSON.Flush
        Case "CHKUSR" 'Control de usuario
            sUsr=UCase(Request.ServerVariables("AUTH_USER"))
            sSQL="SELECT COUNT(*) AS USRFOUND, '" & sUsr & "' AS USR FROM INFOCOP.dbo.D6DEC_USUARIOS WHERE Upper(USERID)='" & sUsr & "'"
            ReadTBL("CHKUSR", sSQL, false).Flush
        Case Else
            Response.Write "[""Result"":""ERROR"", ""Message"":""Value of parameter A not defined.""]"
            Response.End
        End Select 
    'Case Else 
    '    Response.Write "[""Result"":""ERROR"", ""Message"":""PARAMETERS-NO-RECOGNIZED""]"
    '    Response.End
	End Select
Next

'---> Subrutinas
Function ChkErr(t)
	ChkErr=""
	If Err.Number<>0 Then
		ChkErr = "ERROR (" & Err.Number & ") " & Err.Description
        log t & " > " & ChkErr
		AddLog t & " > " & ChkErr
        Err.Clear
        If Err<>0 Then 
            log "[ChkErr] Err 'AddLog': (" & Err.Number & ") " & Err.Description
            Err.Clear
        End If
	End If
End Function

Sub AddLog (t)
Dim sPthLg, oFSO, oLg
	sPthLg = Server.MapPath(".") & "\log\D6DEC.engine_" & getAAAAMMDD() & ".log.txt"
	Set oFSO = Server.CreateObject("Scripting.FileSystemObject")
	Set oLg = oFSO.OpenTextFile(sPthLg,8,True)
	oLg.Write Time & " (asp)> " & t & vbCrLf
	oLg.Close
	Set oLg = Nothing
	Set oFSO = Nothing
End Sub

Function FrmDate(d)
	FrmDate = CStr(DatePart("yyyy", d)) & "-" & CStr(DatePart("m", d)) & "-" & CStr(DatePart("d", d)) & " "
	FrmDate = FrmDate & CStr(DatePart("h", d)) & ":" & CStr(DatePart("n", d)) & ":" & CStr(DatePart("s", d))
End Function

Function getAAAAMMDD()
	getAAAAMMDD = CStr(Year(Now)*10000+Month(Now)*100+Day(Now))
End Function

Sub GenPDF(sA, sC, sS, sN) 
    'Crear PDF con Click&DECiDE v13.0.6
    'http://stackoverflow.com/questions/17697924/running-vbs-script-on-server-from-iis-asp
    '## NO ESTÁ ACTIVO ##
    Set oWSH = Server.CreateObject("WScript.Shell")
    Set oJSON = jsObject() 'ASPJSON
    oJSON("cmd")="cmd.exe /c """ & Server.ServerVariables("APPL_PHYSICAL_PATH")  & "\cnd\cndengine.vbs " & sA & " " & sC & " " & Session.SessionID & " " & sN & """ "
    AddLog "[GenPDF] cmd.exe /c """ & Server.ServerVariables("APPL_PHYSICAL_PATH")  & "\cnd\cndengine.vbs " & sA & " " & sC & " " & Session.SessionID & " " & sN & """ "
    log "[GenPDF] cmd: cmd.exe /c """ & Server.ServerVariables("APPL_PHYSICAL_PATH")  & "\cnd\cndengine.vbs " & sA & " " & sC & " " & Session.SessionID & " " & sN & """ "
    sRtn = oWSH.Run ("cmd.exe /c """ & Server.ServerVariables("APPL_PHYSICAL_PATH")  & "\cnd\cndengine.vbs " & sA & " " & sC & " " & Session.SessionID & " " & sN & """ ", 0, true)
    oJSON("cmdReturn") = sRtn
    sErr = ChkErr("[GenPDF " & sA & ", " & sC & ", " & Session.SessionID & ", " & sN & "]")
    Set oWSH = Nothing
    If sRtn <> 0 or sErr <> "" Then
        oJSON("Result") = "ERROR"
        oJSON("Message") = "No se ha podido generar el contrato: " & sN 
        oJSON("URL") = GetVirtualPath(Request.ServerVariables("SCRIPT_NAME")) & "pdf/" & Session.SessionID & "/" & sN  
    Else
        oJSON("Result") = "OK"
        oJSON("Message") = "Se ha creado el contrato: " & sN
        oJSON("URL") = GetVirtualPath(Request.ServerVariables("SCRIPT_NAME")) & "pdf/" & Session.SessionID & "/" & sN  
    End If
    oJSON.Flush
End Sub

function GetFileName()
    dim url, segments

    'get then current url from the server variables
    url = Request.ServerVariables("path_info")

    segments = split(url,"/")

    'read the last segment
    url = segments(ubound(segments))
    GetFileName = url
end function 
%>
