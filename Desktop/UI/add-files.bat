@echo off
echo ========================================
echo Adding files to Git (excluding node_modules)
echo ========================================
echo.

echo Step 1: Adding configuration files...
git add .gitignore
git add .gitattributes
git add railway.json
echo [OK] Config files added

echo.
echo Step 2: Adding backend source code...
git add backend/*.js
git add backend/config/
git add backend/routes/
git add backend/services/
git add backend/package.json
git add backend/package-lock.json
echo [OK] Backend files added

echo.
echo Step 3: Adding frontend files...
git add js/
git add css/
git add *.html
echo [OK] Frontend files added

echo.
echo Step 4: Adding documentation...
git add README.md
git add *.md
echo [OK] Documentation added

echo.
echo ========================================
echo Checking Git status...
echo ========================================
git status --short

echo.
echo ========================================
echo Summary:
echo ========================================
echo Files staged for commit. Run: git commit -m "Your message"
echo.

pause

