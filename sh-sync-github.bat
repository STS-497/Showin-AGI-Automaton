@echo off
title [ARCHIVE] Showin AGI - GitHub Cloud Sync
color 0B

echo [1/6] Connecting to Neural Path...
cd /d "C:\Users\ASRock\Desktop\Showin-AGI-Automaton"

echo [2/6] Unlocking Git Security Gate...
git config --global --add safe.directory "C:/Users/ASRock/Desktop/Showin-AGI-Automaton"

echo [4/6] Aligning Neural Paths...
git add .

echo [5/6] Committing AGI Evolution State...
git commit -m "Backup: Codebase Synced to GitHub Archive"

echo [6/6] Pushing to GitHub Storage (Code Cloud)...
git push origin main

echo.
echo ======================================================
echo  BLUEPRINT BACKUP COMPLETE: GitHub Node Updated.
echo ======================================================
pause