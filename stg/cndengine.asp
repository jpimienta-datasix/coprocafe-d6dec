<%
' 
' **  MOTOR PARA GENERACIÓN PDFs (Click&DECiDE)  **
' *                CnD v13.0.6                    *
' *************************************************
' versión: 20161019
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
'***********
' Variables 
'***********
Dim oCnd
Dim oOI
Dim oQs
Dim oPI
Dim oRpt
Dim oPrj
Dim sPrj
Dim sRpt
Dim oPrm
Dim sUsr
Dim sPwd
Dim sSrc

Dim sPth
Dim oFSO

Dim qsA 'Acción: Compra/Venta
Dim qsC 'Número contrato
Dim qsN 'Nombre del fichero PDF generado

'sUsr="d6dec"
'sPwd="DSD23824464"
sUsr="usrcop"
sPwd="usrcop"
sSrc="INFOCOP"

On Error Resume Next
Set oJSON = jsObject() 'ASPJON
oJSON("Result") = "OK"

'***********
' Principal
'***********
Set oCnd=Server.CreateObject("Vision.Application")
Set oFSO=Server.CreateObject("Scripting.FileSystemObject")
sPth=Request.ServerVariables("APPL_PHYSICAL_PATH")
nErr=chkErr("[CreateObject]")

qsA=Request.QueryString("A")
If qsA="C" Then sRpt="CONTRATO Compra" else sRpt="CONTRATO Venta"
qsC=Request.QueryString("C")
qsN=Request.QueryString("N")
nErr=chkErr("[Request.QueryString]")

sPrj=sPth & "cnd\D6DEC.wfv"
Set oPrj=oCnd.GetProject
oPrj.Open sPrj
nErr=chkErr("[Open:" & sPrj & "]")
oPrj.SetLogin sSrc,sUsr,sPwd
nErr=chkErr("[SetLogin]")
Set oRpt=oPrj.Reports(sRpt)
nErr=chkErr("[Report:" & sRpt & "]")
Set oPrm=oRpt.Parameters(0)
oPrm("p_CTTO").Value=qsC
nErr=chkErr("[Parameters: C=" & qsC & "]")
Set oPI=oPrj.PrintInfos()
oPI.FormatPDF = True
oPI.PrintToFile = True
oPI.QuietMode = True   
' To get All pages
oPI.FromPage = 1
oPI.ToPage = -1	 '(all)
oPI.OutFileName = sPth & "pdf\" & Session.SessionID & "\" & qsN		
oPrj.d7Print oRpt, oPI
nErr=chkErr("[d7Print]")

oJSON("File")=sPth & "pdf\" & Session.SessionID & "\" & qsN
oJSON("Link")= "pdf\" & Session.SessionID & "\" & qsN

oJSON.Flush


Set oPI=Nothing
Set oPrm=Nothing
Set oRpt=Nothing
Set oPrj=Nothing
Set oFSO=Nothing
Set oCnd=Nothing

'***********
' Funciones
'***********
Function chkErr(t)
	If Err<>0 Then
		oJSON("Flag")=t
		oJSON("Result") = "ERROR"
		oJSON("Message") = Err.Description
		oJSON.Flush
	End If
	chkErr=Err
End Function

%>