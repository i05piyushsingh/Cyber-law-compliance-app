# PowerShell Script to Publish Project to GitHub
param (
    [string]$RepoUrl
)

Clear-Host
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  NFSU Cyber Law & Compliance App - Push to GitHub" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

if (-not $RepoUrl) {
    Write-Host "`nPlease enter your GitHub Repository URL." -ForegroundColor White
    Write-Host "Example: https://github.com/<YOUR-USERNAME>/<REPO-NAME>.git`n" -ForegroundColor Gray
    $RepoUrl = Read-Host "Enter GitHub Repo URL"
}

if (-not $RepoUrl -or $RepoUrl.Trim() -eq "") {
    Write-Host "`n[ERROR] No repository URL provided. Aborting." -ForegroundColor Red
    exit 1
}

$RepoUrl = $RepoUrl.Trim()

Write-Host "`n[1/4] Configuring remote origin: $RepoUrl..." -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin $RepoUrl

Write-Host "[2/4] Setting main branch..." -ForegroundColor Cyan
git branch -M main

Write-Host "[3/4] Staging and committing all files..." -ForegroundColor Cyan
git add -A
git commit -m "Publish Cyber Law, Risk & Compliance Web Application with GitHub Pages and Cloud Deployment" 2>$null

Write-Host "[4/4] Pushing to GitHub (main branch)..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n==========================================================" -ForegroundColor Green
    Write-Host "  SUCCESS! Project successfully published to GitHub." -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "`nYour repository is now online at:" -ForegroundColor White
    Write-Host "  $RepoUrl" -ForegroundColor Yellow
    Write-Host "`nTo activate GitHub Pages free hosting on the internet:" -ForegroundColor White
    Write-Host "  1. Open your repository on GitHub."
    Write-Host "  2. Go to 'Settings' -> 'Pages' (in the left menu)."
    Write-Host "  3. Under 'Source', select 'GitHub Actions' (already automated via .github/workflows/deploy.yml)"
    Write-Host "     OR select 'Deploy from a branch' -> branch 'main' -> folder '/docs' -> Save."
    Write-Host "  4. Your website will be live at: https://<username>.github.io/<repo-name>/" -ForegroundColor Green
} else {
    Write-Host "`n[NOTICE] Push encountered an issue." -ForegroundColor Yellow
    Write-Host "If GitHub asks for credentials, log in with your GitHub Personal Access Token or browser prompt." -ForegroundColor White
}
