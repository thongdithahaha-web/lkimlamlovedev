@echo off
chcp 65001 >nul
title DLove.vn - Local Test Server

echo ================================================================
echo           DLOVE.VN - LOCAL DEVELOPMENT SERVER
echo ================================================================
echo.

:: Kiem tra Node.js da duoc cai dat hay chua
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [LOI] Khong tim thay Node.js tren may tinh cua ban!
    echo Vui long cai dat Node.js tai https://nodejs.org/ de tiep tuc.
    echo.
    pause
    exit /b 1
)

echo [*] Node.js da san sang:
node -v
echo.

echo [*] Dang khoi dong Web Server tai cong 3000...
echo [*] Tu dong mo trinh duyet tai: http://localhost:3000
echo.
echo Nhan to hop phim [Ctrl + C] neu ban muon tat Server.
echo ================================================================
echo.

:: Mo trinh duyet sau 1 giay de dam bao server da san sang
start "" cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:3000"

:: Chay server Node.js
node server.js

pause
