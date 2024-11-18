@echo off
:: Script para respaldar una base de datos en SQL Server
:: Configuración de variables
set "ROOTDIR=%CD%"
set "DATABASE_NAME=Plantilla"
set "BACKUP_PATH=%ROOTDIR%\db\%DATABASE_NAME%.bak"
set "SQL_SERVER=localhost"
set "SQL_USER=sa"
set "SQL_PASSWORD=123456"

:: Crear directorio de respaldo si no existe
if not exist "%ROOTDIR%\db\" mkdir "%ROOTDIR%\db\"

:: Ejecutar el comando de respaldo
sqlcmd -S %SQL_SERVER% -U %SQL_USER% -P %SQL_PASSWORD% -Q "BACKUP DATABASE [%DATABASE_NAME%] TO DISK = N'%BACKUP_PATH%' WITH COMPRESSION, INIT, FORMAT, NAME = N'Respaldo_%DATABASE_NAME%'"

if %errorlevel% equ 0 (
    echo Respaldo completado exitosamente: %BACKUP_PATH%
) else (
    echo Error al realizar el respaldo.
    exit /b 1
)
