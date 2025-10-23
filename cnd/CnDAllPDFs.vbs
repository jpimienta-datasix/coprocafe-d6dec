
' ***************************************************
' **  GENERACIÓN de todos los PDFs (Click&DECiDE)  **
' *                CnD v13.0.6                      *
' ***************************************************
' versión: 20161215
' última modificación: 20161219
' autor: jpimienta@datasix.es 
' web: http://www.datasix.es
'
' ~~~~~
' NOTA: Guardarlo como "UTF-8"
' ~~~~~


'***********
' Variables 
'***********
Dim oCnd
Dim oOI
Dim oQs
Dim oPI
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
Dim sPthDoc 'Directorio dónde dejar los Doc's
Dim oFSO

Dim bShowSQL
Dim nRow
Dim nFld
Dim nFlds

Dim sT
Dim sPT

sUsr="d6dec"
sPwd="DSD23824464"
'sUsr="usrcop"
'sPwd="usrcop"
sSrc="INFOCOP"
'sPth="C:\_Clientes\Coprocafe\D6DEC\www\"
sPth="C:\apps\D6DEC\www\"
sPthDoc=sPth & "doc\"
sQry="Listado PDFs"
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
Set oQry=oPrj.Queries(sQry)
nErr=chkErr(sQry)
'Cargamos los datos
Set oDta=oQry.Data 
bShowSQL=False
nRow=1
bOk=oDta.FirstRow(0,bShowSQL)
If bOk Then
	Set oCols=oDta.Columns
	nFlds=oCols.Count
	While bOk
		nRow=nRow+1
		Set oColDta=oCols.ColumnData(0) 'PDF
		sPDF=oColDta.Value
		Set oColDta=oCols.ColumnData(1) 'Tipo (Compra, Venta, Oferta)
		sT=oColDta.Value
		Set oColDta=oCols.ColumnData(2) 'Tipo de Precio: 1 (FijaciónMercado=No; hay un precio informado) 2 (FijaciónMercado=Sí)'
		sPT=oColDta.Value
		If (sPT=1) Then sRpt="CONTRATO" Else sRpt="CONTRATO - Price-to-be-fixed"
		Set oRpt=oPrj.Reports(sRpt)
		nErr=chkErr("[Report:" & sRpt & "]")
		Set oPrm=oRpt.Parameters(0)
		nErr=chkErr("[Parameters]")
		oPrm("p_PDF").Value=sPDF
		nErr=chkErr("[Parameter: p_PDF=" & sPDF & "]")
		Set oPI=oPrj.PrintInfos()
		oPI.FormatPDF = True
		oPI.PrintToFile = True
		oPI.QuietMode = True   
		' To get All pages
		oPI.FromPage = 1
		oPI.ToPage = -1	 '(all)
		oPI.OutFileName = sPthDoc & sPDF
		oPrj.d7Print oRpt, oPI
		nErr=chkErr("[d7Print]")
		if nErr=0 Then
			AddLog nRow & " > (" & sT & "/" & Iif(sPT=1,"Outright","Price-to-be-fixed") & ")" & sPthDoc & sPDF & " > CORRECTO!"
		Else
			AddLog "[!] " & nRow & " > (" & sT & "/" & Iif(sPT=1,"Outright","Price-to-be-fixed") & ")" & sPthDoc & sPDF & " > ERROR!"
		End If
		bOk=oDta.NextRow()
	Wend
	bOk=oDta.AbortData()
End If

AddLog "Fin PDFs! en " & DateDiff("s",Tini,Time) & " segundos."
'MsgBox "Fin: " & sPth & "pdf\pruebas_vbs\" & qsN

Set oPI=Nothing
Set oPrm=Nothing
Set oRpt=Nothing
Set oPrj=Nothing
Set oFSO=Nothing
Set oCnd=Nothing
Set oCols=Nothing
Set oColDta=Nothing
Set oDta=Nothing

'***********
' Funciones
'***********
Function chkErr(t)
	If Err<>0 Then
		AddLog "Flag: " & t & vbcrLF & "Result: ERROR" & vbcrLF & "Message: " & Err.Description  ,"ERROR"
	End If
	chkErr=Err
End Function

Function getAAAAMMDD()
	getAAAAMMDD = CStr(Year(Now)*10000+Month(Now)*100+Day(Now))
End Function

Sub AddLog (t)
Dim sPthLg, oFSO, oLg
	sPthLg = sPth & "log\CnDAllPDFS_" & getAAAAMMDD() & ".log.txt"
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
