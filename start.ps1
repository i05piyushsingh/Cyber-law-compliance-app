# PowerShell Launcher for Cyber Law, Risk & Compliance Web Application
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host " Starting Cyber Law, Risk and Compliance Web Application..." -ForegroundColor Yellow
Write-Host " National Forensic Sciences University (NFSU) - M.Sc. Cyber Forensics" -ForegroundColor Green
Write-Host " Course Code: FSMS23 SIII SP-V P1" -ForegroundColor Green
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host ""

$port = 3000
Start-Process "http://localhost:$port"
Write-Host "Serving locally at: http://localhost:$port" -ForegroundColor Green
Write-Host "Press Ctrl+C to terminate the local server." -ForegroundColor Yellow
node server.js
