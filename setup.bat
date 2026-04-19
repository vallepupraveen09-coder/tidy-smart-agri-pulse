@echo off
REM AgriAI Quick Setup Script for Windows

echo.
echo ========================================
echo    AgriAI Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found: %~1 node -v%

echo.
echo Installing Backend Dependencies...
cd server
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed

echo.
echo Installing Frontend Dependencies...
cd ..\client
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed

echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo 1. Terminal 1 - Backend:
echo    cd server
echo    npm run dev
echo.
echo 2. Terminal 2 - Frontend:
echo    cd client
echo    npm run dev
echo.
echo 3. Open browser: http://localhost:5173
echo.
echo ========================================
echo.
pause
