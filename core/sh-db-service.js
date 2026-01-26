/* * Showin AGI - Financial Security Core (sh-db-service.js)
 * 財務原子化交易與實體數據規範 v2026.1.27 [cite: 2026-01-25]
 */

import { getFirestore, doc, onSnapshot, collection, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const SH_DB_Service = {
    /**
     * 實時數據流監聽 (去假存真規範)
     * 嚴禁使用 Mock Data 或靜態陣列填充 [cite: 2026-01-25]
     */
    listenToArtifacts: (callback) => {
        const db = getFirestore();
        // 實時對位神經路徑：artifacts/showin-ai/ [cite: 2026-01-25]
        const q = query(collection(db, "artifacts/showin-ai/public/data"), orderBy("createdAt", "desc"), limit(50));

        return onSnapshot(q, (snapshot) => {
            if (snapshot.empty) {
                console.warn("⚠️ [SH-DB] 偵測到真實數據斷點 (Empty State)，UI 應忠實呈現空態。");
            }
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            callback(data);
        });
    },

    /**
     * 財務原子化交易 (PTS 安全規則)
     * 嚴禁前端修改數字，必須通過令牌驗證與後端接口 [cite: 2026-01-25]
     */
    adjustPoints: async (amount) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error("❌ [Financial-Auth] 交易失敗：未偵測到實體登入身分。");
        }

        try {
            console.log("🎯 [SH-DB] 啟動原子化交易程序，請求後端權威寫入...");

            // 1. 獲取並強制刷新真實令牌 (ID Token) [cite: 2026-01-25]
            const token = await user.getIdToken(true);

            // 2. 呼叫後端 sh-db-service 實體接口 [cite: 2026-01-25]
            const apiEndpoint = "https://showin-engine-1057607013984.asia-east1.run.app/api/v1/admin/adjust-points";
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    uid: user.uid,
                    amount: amount, // 正數為增加，負數為扣除
                    timestamp: new Date().toISOString()
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Atomic Transaction Denied by Engine");
            }

            console.log(`✅ [SH-DB] 點數變更成功: ${amount} PTS. 新餘額由後端權威同步中。`);
            return { success: true, newBalance: result.newBalance };

        } catch (error) {
            console.error("🚨 [Financial-Security] 交易攔截:", error.message);
            return { success: false, error: error.message };
        }
    }
};

export default SH_DB_Service;