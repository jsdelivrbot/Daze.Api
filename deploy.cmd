REM @echo off

REM .paket\paket.bootstrapper.exe
REM if errorlevel 1 (
REM   exit /b %errorlevel%
REM )

REM if not exist paket.lock (
REM   .paket\paket.exe install
REM ) else (
REM   .paket\paket.exe restore
REM )

REM if errorlevel 1 (
REM   exit /b %errorlevel%
REM )
REM packages\FAKE\tools\FAKE.exe %* --fsiargs build.fsx

@echo off
cls

if not exist .paket (
  @echo "Installing Paket"
  mkdir .paket
  curl https://github.com/fsprojects/Paket/releases/download/5.2.2/paket.bootstrapper.exe -L --insecure -o .paket\paket.bootstrapper.exe

  .paket\paket.bootstrapper.exe prerelease
  if errorlevel 1 (
    exit /b %errorlevel%
  )
)

if not exist paket.lock (
  @echo "Installing dependencies"
  .paket\paket.exe install
) else (
  @echo "Restoring dependencies"
  .paket\paket.exe restore
)

if errorlevel 1 (
  exit /b %errorlevel%
)

@echo "Copying files to web root"
xcopy /s /y . d:\home\site\wwwroot\