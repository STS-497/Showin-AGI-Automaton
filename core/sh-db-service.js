/* Showin AGI - 實體數據服務核心 (去假存真規範) v2026.1.27 */
import { getFirestore, doc, onSnapshot, collection, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const SH_DB_Service = {
    /**
     * 初始化實體神經傳導
     * 執行路徑對位：artifacts/showin-ai/ [cite: 2026-01-25]
     */
    init: () => {
        console.log("🧬 [SH_DB] 實體神經傳導：已接通 Firebase 實時路徑 [cite: 2026-01-27]");
        // 嚴禁使用 Mock Data，所有的數據流必須源自實體路徑 [cite: 2026-01-25]
    },

    /**
     * 實時監聽數據流
     * @param {string} subPath 子路徑
     * @param {function} callback 數據更新回調
     */
    listenToFlows: (subPath, callback) => {
        const db = getFirestore();
        const q = query(
            collection(db, `artifacts/showin-ai/public/data/${subPath}`), 
            orderBy('createdAt', 'desc'), 
            limit(20)
        );

        // 實時監聽 onSnapshot，忠實呈現實體變動 [cite: 2026-01-25]
        return onSnapshot(q, (snapshot) => {
            if (snapshot.empty) {
                console.log("⚠️ [SH_DB] 偵測到數據斷點 (Empty State)");
            }
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            callback(data);
        });
    },

    /**
     * 原子化點數交易 (PTS)
     * 財務原子化交易規範：嚴禁前端修改數字 [cite: 2026-01-25]
     * @param {number} amount 增減點數值 (delta PTS)
     */
    adjustPoints: async (amount) => {
        console.log("🎯 [SH_DB] 啟動原子化交易程序...");
        const auth = getAuth();
        
        if (!auth.currentUser) {
            console.error("❌ [SH_DB] 交易失敗：未偵測到實體身份");
            return { success: false, error: "Authentication Required" };
        }

        try {
            // 1. 獲取真實令牌 (Force Refresh) [cite: 2026-01-25]
            const token = await auth.currentUser.getIdToken(true);
            const apiBase = window.API_BASE || "https://showin-engine-1057607013984.asia-east1.run.app";

            // 2. 呼叫後端執行原子化寫入 [cite: 2026-01-25]
            const response = await fetch(`${apiBase}/api/v1/admin/adjust-points`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ amount: amount })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Atomic Transaction Failed");
            }

            const result = await response.json();
            console.log("✅ [SH_DB] 原子化交易完成，PTS 已同步更新 [cite: 2026-01-27]");
            return { success: true, data: result };

        } catch (error) {
            console.error("❌ [SH_DB] 交易中斷:", error.message);
            return { success: false, error: error.message };
        }
    }
};

export default SH_DB_Service;