
' *************************************************
' **  MOTOR PARA GENERACIÓN PDFs (Click&DECiDE)  **
' *                CnD v13.0.6                    *
' *************************************************
' versión: 20170208
' autor: jpimienta@datasix.es 
' web: http://www.datasix.es
'
'
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

Dim qsT 'Tipo: Compra/Venta/Oferta (C/V/O)
Dim qsPT 'PriceType > para saber si tiene FIJACIÓN_MERCADO (2) o no  (1)
Dim qsS 'Sesión ASP
Dim qsPDF 'Nombre del fichero PDF generado

Dim bDbg 'Para pruebas (debug)

bDbg=false

If bDbg Then
	qsT="C"
	qsPT="1"
	qsS="test"
	qsPDF="LHT0 0049190 00 05.12.16 EUR 001034700.pdf" 'LHT0 7230901 00 22.08.16 EUR 002903800.pdf 'Venta
Else
	Set oArgs=WScript.Arguments
	qsT = oArgs(0)
	qsS = oArgs(1)
	qsPDF = oArgs(2)
	qsPT = oArgs(3)
	Set oArgs=Nothing
End If

'sUsr="d6dec"
'sPwd="DSD23824464"
sUsr="usrcop"
sPwd="usrcop"
sSrc="INFOCOP"

If not bDbg Then On Error Resume Next

'***********
' Principal
'***********
Set oCnd=WScript.CreateObject("Vision.Application")
Set oFSO=WScript.CreateObject("Scripting.FileSystemObject")
'sPth="C:\_Clientes\Coprocafe\D6DEC\www\"
sPth="C:\apps\D6DEC\www\"
nErr=chkErr("[CreateObject]")
If qsPT=1 Then sRpt="CONTRATO" else sRpt="CONTRATO - Price-to-be-fixed"

AddLog "Inicio <" & sRpt & "> (Compra/Venta/Oferta: " & qsT & " | Session: " & qsS & " | PDF: " & qsPDF & " | PriceType: " & qsPT & ")"

sPrj=sPth & "cnd\D6DEC.wfv"
Set oPrj=oCnd.GetProject
oPrj.Open sPrj
nErr=chkErr("[Open:" & sPrj & "]")
oPrj.SetLogin sSrc,sUsr,sPwd
nErr=chkErr("[SetLogin]")
Set oRpt=oPrj.Reports(sRpt)
nErr=chkErr("[Report:" & sRpt & "]")
Set oPrm=oRpt.Parameters(0)
nErr=chkErr("[Parameters]")
oPrm("p_PDF").Value=qsPDF 'Replace(qsPDF,"_"," ")
nErr=chkErr("[Parameter: p_PDF=" & qsPDF & "]")
oPrm("p_T").Value=qsT 
nErr=chkErr("[Parameter: p_T=" & qsT & "]")
Set oPI=oPrj.PrintInfos()
oPI.FormatPDF = True
oPI.PrintToFile = True
oPI.QuietMode = True   
' To get All pages
oPI.FromPage = 1
oPI.ToPage = -1	 '(all)
'oPI.OutFileName = sPth & "pdf\" & qsS & "\" & qsPDF		
oPI.OutFileName = sPth & "doc\" & qsPDF		
oPrj.d7Print oRpt, oPI
nErr=chkErr("[d7Print]")

'oJSON("File")=sPth & "pdf\" & Session.SessionID & "\" & qsN
'oJSON("Link")= "pdf\" & Session.SessionID & "\" & qsN

'oJSON.Flush
AddLog "Fin (Compra/Venta/Oferta: " & qsT & " | Session: " & qsS & " | PDF: " & qsPDF & " | PriceType: " & qsPT & ")"
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
Function chkErr(t)
	If Err<>0 Then
		'oJSON("Flag")=t
		'oJSON("Result") = "ERROR"
		'oJSON("Message") = Err.Description
		'oJSON.Flush
		'MsgBox "Flag: " & t & vbcrLF & "Result: ERROR" & vbcrLF & "Message: " & Err.Description  ,"ERROR"
		AddLog "Flag: " & t & vbcrLF & "Result: ERROR" & vbcrLF & "Message: (" & Err.Number & ") " & Err.Description  
	End If
	chkErr=Err
End Function

Function getAAAAMMDD()
	getAAAAMMDD = CStr(Year(Now)*10000+Month(Now)*100+Day(Now))
End Function

Sub AddLog (t)
Dim sPthLg, oFSO, oLg
	sPthLg = sPth & "log\CnDEngine_" & getAAAAMMDD() & ".log.txt"
	Set oFSO = WScript.CreateObject("Scripting.FileSystemObject")
	Set oLg = oFSO.OpenTextFile(sPthLg,8,True)
	oLg.Write Time & " [vbs]> " & t & vbCrLf
	oLg.Close
	Set oLg = Nothing
	Set oFSO = Nothing
End Sub