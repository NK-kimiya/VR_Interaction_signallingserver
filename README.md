## 開発したもの 

目的：仮想空間(メタバース)上で音声通話をしながらコミュニケーションができるアプリで、「病気や障がいなどがきっかけで感じる孤独感を軽減したい」という目的でミニマムで開発を進めました。

[紹介記事](https://kimikou-blog.jp/prototypes/vr%e3%82%a2%e3%83%97%e3%83%aa/)

## 利用ツール：Unity、Django、Express、React

 [VR_Interaction_UnityOpenXR(Unity)](https://github.com/NK-kimiya/VR_Interaction_UnityOpenXR)　

 [VR_Interaction_API(Django)](https://github.com/NK-kimiya/VR_Interaction_API)　

 [VR_Interaction_signallingserver(Express)](https://github.com/NK-kimiya/VR_Interaction_signallingserver)　

 [VR_Interaction_WebRTC(React)](https://github.com/NK-kimiya/VR_Interaction_WebRTC)　

 ※下記の方法での実行を試しました。　
 
 Django、Express、Reactはホスティングサービス(RenderやHerokuなど)でホスティングを行い、Unityはビルドし、MetaQuest2に実行ファイルを送信　

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

#### サーバー側（Express + PeerJS)　

・クライアントのPeerIDを **登録・管理**　

・クライアント同士の **SDP・ICE候補の交換** を中継

## デプロイの注意事項 

app.jsの以下のコード```origin: process.env.CORS_ORIGIN```の箇所にReactプロジェクトをデプロイしたURLを記載するか、環境変数ファイルにデプロイしたURLを追加して下さい。　

[Reactプロジェクト](https://github.com/NK-kimiya/VR_Interaction_WebRTC)　　

```https://comunity-app-front.web.app/```は、ホスティングされていないURLです。

```
app.use(cors({
  origin: process.env.CORS_ORIGIN
  //'https://comunity-app-front.web.app/',//本番用コード
}));
```

### 連携プロジェクト

[VR_Interaction_WebRTC(React)](https://github.com/NK-kimiya/VR_Interaction_WebRTC)　

-WebRTCを使用して、Web上で音声通話、ビデオ通話を行う　

-アカウントの作成とログインのリクエスト　

[VR_Interaction_API(Django)](https://github.com/NK-kimiya/VR_Interaction_API)　

-Reactでカウントの作成、ログイン処理のAPI　

-VRでユーザーIDを通したログイン処理のAPI　

[VR_Interaction_UnityOpenXR(Unity)](https://github.com/NK-kimiya/VR_Interaction_UnityOpenXR)　

-MetaQuest2を使用したVR空間のアバター操作



