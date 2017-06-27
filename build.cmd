@echo off
cls

.paket\paket.bootstrapper.exe
if errorlevel 1 (
    exit /b %errorlevel%
)

.paket\paket.exe restore
if errorlevel 1 (
    exit /b %errorlevel%
)

REM packages\FAKE\tools\FAKE.exe build.fsx %*
packages\FAKE\tools\FAKE.exe %* --fsiargs build.fsx


