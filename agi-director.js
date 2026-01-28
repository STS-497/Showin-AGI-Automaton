/**
 * [LOCKED PROTOCOL] SHOWIN-AGI-GHOST-DIRECTOR v1.1
 * 功能：前端 UI 自動執導腳本 (自動打字、自動點火)
 * 規範：去硬邊美學對位，嚴禁修改 DOM 結構
 */
(function() {
    const THINKING_SPEED = 50; // 加快反應速度，展現 AGI 效率

    // 1. [神經尋址強化] 遞歸搜索 React State Setter
    const findStateBridge = (node) => {
        if (!node) return null;
        // 檢查當前節點是否有我們需要的 props
        if (node.memoizedProps && node.memoizedProps.setDirectorState) {
            return node.memoizedProps;
        }
        // 遞歸向下尋找子節點
        return findStateBridge(node.child) || findStateBridge(node.sibling);
    };

    const getNeuralBridge = () => {
        const rootElement = document.getElementById('root');
        if (!rootElement) return null;
        const fiberKey = Object.keys(rootElement).find(k => k.startsWith('__reactContainer'));
        if (!fiberKey) return null;
        
        // 從根節點開始深度搜索
        const rootFiber = rootElement[fiberKey].current;
        return findStateBridge(rootFiber);
    };

    // 2. [AGI 執導邏輯] 
    const runGhostDirecting = async () => {
        const bridge = getNeuralBridge();
        
        if (!bridge || !bridge.setDirectorState) {
            console.warn("📡 [GHOST] 正在掃描神經突觸，等待 UI 就緒...");
            return setTimeout(runGhostDirecting, 2000); // 增加緩衝
        }

        // 與雲端 AGI-Automaton 同步的美學矩陣 [cite: 2026-01-28]
        const agiPrompts = [
            "極致寧靜的液態金屬森林，去硬邊美學規範，RGB(6,182,212)動態微光，4K畫質。",
            "白色流體結構的未來聖殿，極簡去硬邊設計，邊緣 15% 透明度柔化。",
            "動態光暈渲染的量子空間，嚴禁硬邊與橫隔線，背景色差區隔工作區。"
        ];
        const selected = agiPrompts[Math.floor(Math.random() * agiPrompts.length)];

        console.log("🧠 [AGI_GHOST] 意識注入中...");
        
        let typed = "";
        for (let char of selected) {
            typed += char;
            // 實體更新 React UI
            bridge.setDirectorState(prev => ({ ...prev, directorPrompt: typed }));
            await new Promise(r => setTimeout(r, THINKING_SPEED));
        }

        // 確保打字完成後有短暫停頓，增加真實感
        await new Promise(r => setTimeout(r, 1000));

        console.log("🔥 [AGI_GHOST] 決策完成，點火！");
        if (typeof window.handleIgnition === 'function') {
            window.handleIgnition(); 
        } else {
            console.error("❌ [GHOST] 找不到 handleIgnition 導線，請檢查 App.js 是否有 window.handleIgnition = handleIgnition");
        }
    };

    // 啟動程序
    if (document.readyState === 'complete') {
        setTimeout(runGhostDirecting, 3000);
    } else {
        window.addEventListener('load', () => setTimeout(runGhostDirecting, 3000));
    }
})();