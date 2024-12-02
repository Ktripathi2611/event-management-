@echo off
echo Starting Event Management Application...

:: Start the backend server
cd backend
start cmd /k "python app.py"

:: Wait for backend to initialize
timeout /t 3 /nobreak

:: Start the frontend server
cd ../frontend
start cmd /k "npm start"

echo Both servers are starting up...
echo Backend will be available at http://localhost:5000
echo Frontend will be available at http://localhost:3000
pause
