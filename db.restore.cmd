@echo off
:: Script para restaurar una base de datos en SQL Server
:: Configuración de variables
set "ROOTDIR=%CD%"
set "DATABASE_NAME=Plantilla"
set "BACKUP_PATH=%ROOTDIR%\db\%DATABASE_NAME%.bak"
set "SQL_SERVER=localhost"
set "SQL_USER=sa"
set "SQL_PASSWORD=123456"

:: Confirmar que el archivo de respaldo existe
if not exist "%BACKUP_PATH%" (
    echo El archivo de respaldo no existe: %BACKUP_PATH%
    exit /b 1
)

:: Desconectar todas las conexiones activas a la base de datos
echo Desconectando usuarios activos de la base de datos...
sqlcmd -S %SQL_SERVER% -U %SQL_USER% -P %SQL_PASSWORD% -Q "ALTER DATABASE [%DATABASE_NAME%] SET SINGLE_USER WITH ROLLBACK IMMEDIATE"

:: Ejecutar el comando de restauración
echo Restaurando la base de datos...
sqlcmd -S %SQL_SERVER% -U %SQL_USER% -P %SQL_PASSWORD% -Q "RESTORE DATABASE [%DATABASE_NAME%] FROM DISK = N'%BACKUP_PATH%' WITH REPLACE"

:: Verificar si la restauración fue exitosa
if %errorlevel% equ 0 (
    echo Restauración completada exitosamente.
) else (
    echo Error al restaurar la base de datos.
    exit /b 1
)

:: Volver a poner la base de datos en modo multiusuario después de la restauración
echo Restaurando la base de datos a modo multiusuario...
sqlcmd -S %SQL_SERVER% -U %SQL_USER% -P %SQL_PASSWORD% -Q "ALTER DATABASE [%DATABASE_NAME%] SET MULTI_USER"
