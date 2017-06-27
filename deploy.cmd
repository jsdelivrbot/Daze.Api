@echo off

.paket\paket.bootstrapper.exe
if errorlevel 1 (
  exit /b %errorlevel%
)

if not exist paket.lock (
  .paket\paket.exe install
) else (
  .paket\paket.exe restore
)

if errorlevel 1 (
  exit /b %errorlevel%
)
packages\FAKE\tools\FAKE.exe %* --fsiargs build.fsx

REM @echo off
REM cls

REM if not exist .paket (
REM   @echo "Installing Paket"
REM   mkdir .paket
REM   curl https://github.com/fsprojects/Paket/releases/download/1.4.0/paket.bootstrapper.exe -L --insecure -o .paket\paket.bootstrapper.exe

REM   .paket\paket.bootstrapper.exe prerelease
REM   if errorlevel 1 (
REM     exit /b %errorlevel%
REM   )
REM )

REM if not exist paket.lock (
REM   @echo "Installing dependencies"
REM   .paket\paket.exe install
REM ) else (
REM   @echo "Restoring dependencies"
REM   .paket\paket.exe restore
REM )

REM if errorlevel 1 (
REM   exit /b %errorlevel%
REM )

REM @echo "Copying files to web root"
REM xcopy /s /y . d:\home\site\wwwroot\