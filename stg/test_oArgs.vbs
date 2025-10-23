Dim qsA 'Acción: Compra/Venta
Dim qsC 'Número contrato
Dim qsN 'Nombre del fichero PDF generado
Dim oArgs

'sUsr="d6dec"
'sPwd="DSD23824464"
sUsr="usrcop"
sPwd="usrcop"
sSrc="INFOCOP"

Set oArgs=WScript.Arguments
qsA = oArgs(0)
qsC = oArgs(1)
qsN = oArgs(2)

MsgBox "qsA: " & qsA & VbCrLf & "qsC: " & qsC & VbCrLf & "qsN: " & qsN