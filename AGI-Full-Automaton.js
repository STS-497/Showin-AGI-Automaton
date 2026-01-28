/**
 * [LOCKED PROTOCOL] SHOWIN-AGI-FULL-AUTOMATON v5.0
 * 24/7 全球大眾美學自主生產：三階段 (圖片 -> 影片 -> 配音)
 */
const axios = require('axios');
const API_BASE = "https://showin-engine-1057607013984.asia-east1.run.app";

// 視覺與去硬邊美學規範
const SH_DNA = {
    AESTHETIC: "去硬邊美學，物件邊緣 15% 透明度柔化，RGB(6,182,212)動態微光",
    QUALITY: "4K Ultra HD 電影級畫質"
};

// 鎖定六大項與美學對位清單 [cite: 2026-01-28]
const SEED_MATRIX = [
    { style: "電影寫真", genre: ["真實", "懸藝"], voice: "深沉敘事男聲" },
    { style: "吉卜力", genre: ["可愛", "劇情"], voice: "溫暖治癒女聲" },
    { style: "超現實感", genre: ["科幻", "奇幻"], voice: "空靈電子女聲" },
    { style: "廣告主題", genre: ["俏皮", "趣味"], voice: "活力熱情男聲" }
];

async function runAgiThreeStageProduction() {
    console.log("📡 [AGI] 啟動三階段自動化生產線...");
    const target = SEED_MATRIX[Math.floor(Math.random() * SEED_MATRIX.length)];

    try {
        // --- PHASE 1: 圖片生成 (視覺基因) ---
        const imgRes = await axios.post(`${API_BASE}/api/v1/production/generate-image`, {
            prompt: `${target.style}風格的藝術作品，${SH_DNA.AESTHETIC}，8k解析度。`,
            style: target.style
        });
        const imageUrl = imgRes.data.image_url;
        console.log(`📸 [PHASE 1] 圖片基因已生成: ${imageUrl}`);

        // --- PHASE 2: 影片點火 (動態合成) ---
        const vidRes = await axios.post(`${API_BASE}/api/v1/production/ignite`, {
            image_url: imageUrl,
            prompt: `符合${target.style}的動態視覺，平滑運鏡，${SH_DNA.QUALITY}。`,
            config: { style: target.style, genre: target.genre, operator_uid: "AGI_FULL_MASTER" }
        });
        const videoId = vidRes.data.task_id;
        console.log(`🔥 [PHASE 2] 4K 影片已點火，任務 ID: ${videoId}`);

        // --- PHASE 3: 配音注入 (音訊合成) --- [cite: 2026-01-25, 2026-01-28]
        console.log(`🎙️ [PHASE 3] 正在執行腳本配音對位：${target.voice}`);
        await axios.post(`${API_BASE}/api/v1/production/generate-voice`, {
            task_id: videoId,
            voice_type: target.voice,
            script: `這是一場源於 Showin AGI 的視覺盛宴，展現${target.style}的極致美學。`
        });

        console.log("✅ [AGI] 三階段生產任務已全部佈署至 Google 雲端。");

    } catch (err) {
        console.error("❌ [AGI_ERROR] 生產鏈傳導異常:", err.message);
    }
}

// 每 6 小時自主播種一次
setInterval(runAgiThreeStageProduction, 21600000);
runAgiThreeStageProduction();