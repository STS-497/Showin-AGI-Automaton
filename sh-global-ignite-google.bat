@echo off
title [PRODUCTION] Showin AGI - Master Director v5.5 Ignition
color 0E

:: [1/7] 定義實體神經路徑 
echo [1/7] Connecting to Neural Path: Showin-AGI-Automaton...
cd /d "C:\Users\ASRock\Desktop\Showin-AGI-Automaton" 

:: [2/7] 檢查通訊模組是否就緒
if not exist "node_modules\axios" (
    echo [SYSTEM] Installing communication modules...
    npm install axios express
) 

:: [7/7] ACTIVATE: Showin AGI Global Director v5.5 
echo [7/7] ACTIVATE: Showin AGI Master Director v5.5...
echo Logic: Three-Stage Production + Heartbeat Monitor
:: 修正文字對位，鎖定去硬邊美學協議 [cite: 3]
echo Est. Aesthetic: No-Hard-Edge Protocol Active 
echo ------------------------------------------------------

:: ✅ 執行最新整合版 AGI 引擎 (支援 24/7 自主播種) 
node agi-director.js

echo.
echo ====================================================== [cite: 4]
echo  PRODUCTION LIVE: Google Cloud/Local Engine is RUNNING.
echo  Keep this window open for 24/7 autonomous seeding.
echo  Window will auto-close in 100 seconds after process ends.
echo ====================================================== [cite: 4]

:: [NEW] 100秒自動關閉邏輯
timeout /t 100
exit