/**
 * [LOCKED PROTOCOL] SHOWIN-AGI-SEEDING-ENGINE v5.0
 * 24/7 全球自主播種：三階段 (圖片 -> 影片 -> 配音) 精準產出協議
 */
const axios = require('axios');

const API_BASE = "https://showin-engine-1057607013984.asia-east1.run.app";
const APP_ID = "showin-ai";

// 視覺與去硬邊美學規範 
const SH_AESTHETIC = {
    TAG: "去硬邊美學規範，物件邊緣 15% 透明度柔化過渡，嚴禁任何 Border 硬線",
    GLOW: "具備 RGB(6, 182, 212) 動態呼吸感光暈",
    QUALITY: "4K Ultra HD 電影級畫質，極致細節"
};

// 整合後的六大項美學對位清單 
const SEED_MATRIX = [
    {
        name: "Liquid_Sanctuary (液態靜謐)",
        style: "電影寫真", genres: ["真實", "懸藝"], voice: "深沉敘事男聲",
        image_prompt: `極致寧靜的清晨，液態金屬流過柔軟的苔蘚，${SH_AESTHETIC.TAG}，背景具備 ${SH_AESTHETIC.GLOW}。`,
        video_motion: "微風拂過液態植被，平滑的相機前推，治癒感流動光影。",
        channel: "CH-WESTERN-01"
    },
    {
        name: "Golden_Ghibli (溫暖雲端)",
        style: "吉卜力", genres: ["可愛", "劇情"], voice: "溫暖治癒女聲",
        image_prompt: `溫暖午後陽光，懸浮的木造建築與巨大的蓬鬆雲朵，${SH_AESTHETIC.TAG}，背景霧化 40px。`,
        video_motion: "雲朵緩慢漂移，陽光穿過建築縫隙產生丁達爾效應，呼吸感律動。",
        channel: "CH-EASTERN-02"
    },
    {
        name: "Neon_Dreamscape (霓虹夢境)",
        style: "超現實感", genres: ["科幻", "奇幻"], voice: "空靈電子女聲",
        image_prompt: `發光的流體結構在真空中律動，${SH_AESTHETIC.TAG}，具備核心 ${SH_AESTHETIC.GLOW}。`,
        video_motion: "粒子隨節奏噴發，萬花筒式的空間扭曲，極致對稱美學。",
        channel: "CH-GLOBAL-03"
    }
];

async function runAutonomousGeneration() {
    console.log(`📡 [AGI] 啟動全球美學播種程序 (v5.0)...`);
    const target = SEED_MATRIX[Math.floor(Math.random() * SEED_MATRIX.length)];

    try {
        // --- PHASE 1: 圖片生成 (修正 404 路徑) --- 
        console.log(`📸 [PHASE 1] 正在生成圖片基因：${target.name}`);
        const imageRes = await axios.post(`${API_BASE}/api/v1/ai/generate-image`, {
            prompt: target.image_prompt,
            style: target.style,
            app_id: APP_ID
        });

        const keyframeUrl = imageRes.data.image_url;
        console.log(`✅ 圖片基因已就緒: ${keyframeUrl}`);

        await new Promise(r => setTimeout(r, 20000)); // 等待雲端存儲同步

        // --- PHASE 2: 影片點火 --- 
        console.log(`🔥 [PHASE 2] 正在根據圖片引導影片點火...`);
        const videoRes = await axios.post(`${API_BASE}/api/v1/production/ignite`, {
            title: `AGI_GLOBAL_SEED_${Date.now()}`,
            image_url: keyframeUrl, 
            prompt: target.video_motion + " " + SH_AESTHETIC.QUALITY,
            config: {
                quality: "4K",
                style: target.style,
                genre: target.genres,
                channel_id: target.channel,
                operator_uid: "AGI_PRECISION_MASTER" 
            }
        });

        const videoId = videoRes.data.task_id;
        console.log(`🚀 [SUCCESS] 影片已點火，任務 ID: ${videoId}`);

        // --- PHASE 3: 配音注入 --- 
        console.log(`🎙️ [PHASE 3] 執行配音對位：${target.voice}`);
        await axios.post(`${API_BASE}/api/v1/production/generate-voice`, {
            task_id: videoId,
            voice_type: target.voice,
            script: `歡迎來到 Showin AI，這部由 AGI 自主導航生成的作品展現了 ${target.style} 的極致去硬邊美學。`
        });
        
        console.log(`✅ [COMPLETE] 三階段播種任務已全部部屬至 Google 雲端。`);

    } catch (error) {
        console.error("❌ [AGI_ERROR] 神經傳導中斷:", error.message);
        if (error.response?.status === 404) {
            console.log("💡 提示：請檢查 API 路徑是否已從 /production 改為 /ai");
        }
    }
}

// 立即執行並設定 6 小時循環 
runAutonomousGeneration();
setInterval(runAutonomousGeneration, 21600000);