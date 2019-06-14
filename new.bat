@echo off

set Y=%DATE:~0,4%
set M=%DATE:~5,2%
set D=%DATE:~8,2%

if "%1" == "" (
  set TITLE=untitled
) else (
  set TITLE=%1
)
hugo new posts/%Y%-%M%-%D%_%TITLE%.md