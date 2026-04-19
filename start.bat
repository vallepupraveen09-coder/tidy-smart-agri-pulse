@echo off
REM AgriAI Start Script - Opens Backend and Frontend in separate terminals

cd /d "%~dp0"

echo Starting AgriAI...
echo.
echo Backend will start on: http://localhost:5000
echo Frontend will start on: http://localhost:5173
echo.

REM Start Backend in new terminal
echo Starting Backend Server...
start cmd /k "cd server && npm run dev"

REM Wait a moment
timeout /t 3 /nobreak

REM Start Frontend in new terminal
echo Starting Frontend Client...
start cmd /k "cd client && npm run dev"

echo.
echo Both servers are starting...
echo Please wait a few moments for them to be ready.
echo.
echo Open: http://localhost:5173 in your browser
echo.
pause
