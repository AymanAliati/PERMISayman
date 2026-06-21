@echo off
cd /d "%~dp0"

if not exist node_modules (
  echo Installation des dependances Node.js...
  call npm.cmd install
  if errorlevel 1 (
    echo Erreur pendant npm install.
    pause
    exit /b 1
  )
)

echo Demarrage de PERMISayman...
echo Preparation de la version partagee...
call npm.cmd run build
if errorlevel 1 (
  echo Erreur pendant npm run build.
  pause
  exit /b 1
)

echo Ouvre ensuite: http://127.0.0.1:5173
echo Pour un autre PC sur le meme Wi-Fi, utilise l'adresse IP de ce PC avec le port 5173.
start "" http://127.0.0.1:5173
call npm.cmd start
pause
