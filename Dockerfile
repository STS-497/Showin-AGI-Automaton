# [LOCKED PROTOCOL] SHOWIN-AGI-WORKER v1.1
# 基於輕量化 Node 環境 
FROM node:18-slim

# 設定實體工作路徑 
WORKDIR /app

# 複製依賴描述文件 
# 確保您的 package.json 內含 express 與 axios
COPY package*.json ./

# 強制執行生產環境安裝，確保通訊模組就緒 
RUN npm install --production

# 複製 AGI 核心邏輯腳本 
COPY agi-director.js ./

# 開放 Cloud Run 預設通訊埠
EXPOSE 8080

# 啟動 AGI 導演程序，執行 24/7 自動化播種 
CMD ["node", "agi-director.js"]