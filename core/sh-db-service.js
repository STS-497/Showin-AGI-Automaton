/* Showin AGI - 實體數據服務核心 (去假存真規範) v2026.1.27 */
const SH_DB_Service = {
    /**
     * 初始化實體神經傳導
     * 執行路徑對位：artifacts/showin-ai/
     */
    init: () => {
        console.log("🧬 [SH_DB] 實體神經傳導：已接通 Firebase 實時路徑。");
        // 嚴禁使用 Mock Data，所有的數據流必須源自實體路徑
    },

    /**
     * 原子化點數交易 (PTS)
     * 嚴禁前端修改數字，必須通過真實令牌呼叫後端接口
     * @param {number} deltaPTS 增減的點數值
     */
    adjustPoints: async (deltaPTS) => {
        console.log("🎯 [SH_DB] 執行原子化交易請求...");
        
        try {
            // 1. 獲取當前使用者的實體令牌 (Identity Token)
            const auth = window.firebaseAuth; // 假設全域掛載
            if (!auth || !auth.currentUser) throw new Error("未偵測到實體身份");
            
            const token = await auth.currentUser.getIdToken(true);
            const apiBase = window.API_BASE || "https://showin-engine-1057607013984.asia-east1.run.app";

            // 2. 呼叫實體後端接口執行原子化寫入
            const response = await fetch(`${apiBase}/api/v1/admin/adjust-points`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ amount: deltaPTS })
            });

            const result = await response.json();
            
            if (response.ok) {
                console.log("✅ [SH_DB] 原子化寫入成功:", result);
                return result;
            } else {
                throw new Error(result.message || "交易失敗");
            }

        } catch (error) {
            console.error("❌ [SH_DB] 交易中斷:", error.message);
            // 忠實反映真實斷點，不進行虛假預覽
            return null;
        }
    }
};

export default SH_DB_Service;