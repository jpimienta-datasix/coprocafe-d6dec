sCmd = "cmd.exe /c ""C:\Users\Pimienta.DATASIX\Documents\Empresas\Seat\PedidoSugerido\OBJWeb\D6OBJWEB\Web\..\cmd\D6OBJWeb.XLSControl.vbs 339505685"""
Set oWSH = CreateObject("WScript.Shell")
sRtn = oWSH.Run (sCmd, 0, true)
Set oWSH = Nothing 
MsgBox "Err: " & Err.Number