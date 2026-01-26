@echo off
title Showin AGI - Global Force Ignition [cite: 2026-01-27]
color 0B

:: 1. 確保進入實體專案目錄
echo [1/4] Connecting to Neural Path...
cd /d "%USERPROFILE%\Desktop\Showin-AGI-Automaton"

:: 2. 執行全量數據對位 (包含進化日誌)
echo [2/4] Staging Truth-Persistence Logs...
git add .

:: 3. 提交變動 (鎖定上市級紀錄)
echo [3/4] Committing AGI Evolution State...
git commit -m "Log: Sync all evolution histories and fix path mismatch [cite: 2026-01-27]"

:: 4. 強制推向全球雲端
echo [4/4] Pushing to Global Market Node...
git push origin main

echo.
echo ======================================================
echo  SH-AGI: Global Ignition Complete. Check GitHub Actions.
echo ======================================================
pause