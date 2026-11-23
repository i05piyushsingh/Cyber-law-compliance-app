@echo off
setlocal enabledelayedexpansion

echo ==========================================================
echo   NFSU Cyber Law ^& Compliance App - Push to GitHub
echo ==========================================================
echo.
echo Please enter your GitHub Repository URL.
echo Example: https://github.com/YOUR_USERNAME/cyber-law-compliance-app.git
echo.
set /p REPO_URL="Enter GitHub Repo URL: "

if "!REPO_URL!"=="" (
    echo [ERROR] No URL entered. Aborting.
    pause
    exit /b 1
)

echo.
echo [1/4] Setting remote origin...
git remote remove origin 2>nul
git remote add origin !REPO_URL!

echo [2/4] Setting main branch...
git branch -M main

echo [3/4] Staging and committing files...
git add -A
git commit -m "Publish Cyber Law, Risk & Compliance Web Application with GitHub Pages and Cloud Deployment" 2>nul

echo [4/4] Pushing to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==========================================================
    echo   SUCCESS! Project published to GitHub.
    echo ==========================================================
    echo.
    echo To activate GitHub Pages on the internet:
    echo 1. Open your repository on GitHub.
    echo 2. Go to 'Settings' -^> 'Pages'.
    echo 3. Under 'Source', choose 'GitHub Actions' (automated via .github/workflows/deploy.yml)
    echo    OR choose 'Deploy from a branch' -^> 'main' -^> '/docs' -^> Save.
    echo 4. Your web application is now operational on the internet!
) else (
    echo.
    echo [NOTICE] If prompt appeared, complete GitHub authentication.
)

echo.
pause
