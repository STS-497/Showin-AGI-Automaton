@echo off
title [PRODUCTION] Showin AGI - Google Cloud Realtime Ignition
color 0E

echo [1/7] Connecting to Neural Path...
cd /d "C:\Users\ASRock\Desktop\Showin-AGI-Automaton"

:: ... (省略中間 2-6 步 Git 同步代碼) ...

echo [7/7] ACTIVATE: Showin AGI Global Director...
:: ✅ 向 Google Cloud Run 引擎下達 24/7 生產指令 
node agi-director.js

echo.
echo ======================================================
echo  PRODUCTION LIVE: Google Cloud Engine is now RUNNING.
echo  Keep this window open for 24/7 autonomous seeding. [cite: 10]
echo ======================================================
pause