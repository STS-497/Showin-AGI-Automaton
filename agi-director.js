/**
 * [LOCKED PROTOCOL] SHOWIN-AGI-SEEDING-ENGINE v4.0
 * 24/7 全球大眾美學自主播種：兩階段(圖片->影片)精準產出協議
 */
const axios = require('axios');

const API_BASE = "https://showin-engine-1057607013984.asia-east1.run.app";
const APP_ID = "showin-ai";

const SH_AESTHETIC = {
    TAG: "去硬邊美學規範，物件邊緣 15% 透明度柔化過渡，嚴禁任何 Border 硬線",
    GLOW: "具備 RGB(6, 182, 212) 動態呼吸感光暈",
    QUALITY: "4K Ultra HD 電影級畫質，極致細節"
};

const SEED_MATRIX = [
    {
        name: "Liquid_Sanctuary (液態靜謐)",
        style: "電影寫真", genres: ["真實", "奇幻"],
        image_prompt: `極致寧靜的清晨，液態金屬流過柔軟的苔蘚，${SH_AESTHETIC.TAG}，背景具備RGB(6,182,212)微光，8k解析度。`,
        video_motion: "微風拂過液態植被，平滑的相機前推，治癒感流動光影。",
        channel: "CH-WESTERN-01"
    },
    {
        name: "Golden_Ghibli (溫暖雲端)",
        style: "吉卜力", genres: ["可愛", "劇情"],
        image_prompt: `溫暖午後陽光，懸浮的木造建築與巨大的蓬鬆雲朵，${SH_AESTHETIC.TAG}，背景霧化 40px。`,
        video_motion: "雲朵緩慢漂移，陽光穿過建築縫隙產生丁達爾效應，呼吸感律動。",
        channel: "CH-EASTERN-02"
    }
];

async function runAutonomousGeneration() {
    console.log(`📡 [AGI] 啟動全球美學播種程序...`);
    const target = SEED_MATRIX[Math.floor(Math.random() * SEED_MATRIX.length)];

    try {
        console.log(`📸 [PHASE 1] 正在生成圖片基因：${target.name}`);
        const imageRes = await axios.post(`${API_BASE}/api/v1/production/generate-image`, {
            prompt: target.image_prompt,
            style: target.style,
            app_id: APP_ID
        });

        const keyframeUrl = imageRes.data.image_url;
        console.log(`✅ 圖片基因已就緒: ${keyframeUrl}`);

        await new Promise(r => setTimeout(r, 30000)); // 等待雲端存儲同步

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

        if (videoRes.data.success) {
            console.log(`🚀 [SUCCESS] 4K DNA 短片已進入生產線！ID: ${videoRes.data.task_id}`);
        }
    } catch (error) {
        console.error("❌ [AGI_ERROR] 神經傳導中斷:", error.message);
    }
}

// 立即執行並設定循環 (每 6 小時一次)
runAutonomousGeneration();
setInterval(runAutonomousGeneration, 21600000);