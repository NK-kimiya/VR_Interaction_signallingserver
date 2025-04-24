---

## 🧠 このExpressサーバーの役割（機能概要）

このサーバーは、ビデオ通話・音声通話で使用するWebRTCのシグナリングサーバーです。

### ✅ 実装済みの機能

- WebRTCの仲介機能（`peer.js`）とルーム管理
- 接続中ユーザー情報の共有／ブロードキャスト
- 接続・切断イベントの検知と通知

### 🔧 技術スタック（主要ライブラリ）

- `express`：HTTPサーバーとルーティング処理
- `socket.io`：リアルタイム通信（WebSocket）
- `peer`：P2P通信（WebRTC仲介）
- `cors`：CORS制御

##デプロイの注意事項 

app.jsの以下のコード```origin: process.env.CORS_ORIGIN```の箇所にデプロイしたURLを記載するか、環境変数ファイルにデプロイしたURLを追加して下さい。

```
app.use(cors({
  origin: process.env.CORS_ORIGIN
  //'https://comunity-app-front.web.app/',//本番用コード
}));
```

### 連携プロジェクト

-このプロジェクトは下記のReactのプロジェクトと連携しています。


