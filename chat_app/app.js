const express = require('express');
const app = express();
var http = require('http').Server(app);
var http2 = require('http').Server(app);
const { ExpressPeerServer } = require('peer');
const { Server } = require('socket.io');
const path = require('path');

const peerServer = ExpressPeerServer(http, {
  debug: true,
});
let connectedUsers = []; // 接続されている全ユーザーの情報を格納する配列
let userCount = 0; // 接続中のユーザー数を追跡する変数
const cors = require("cors");
require('dotenv').config();

app.use(cors({
  origin: process.env.CORS_ORIGIN
  //'https://comunity-app-front.web.app/',//本番用コード
}));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use('/peerjs', peerServer);
app.get("/", (req, res) => {
  res.render("room")
});
app.set('views', path.join(__dirname, 'views'))
const io = new Server(http
  , {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
const video_chat_socket = io.of('/video_chat_socket');

video_chat_socket.on("connection", socket => {
  console.log("受信完了");
  socket.on("join-room", (roomId, userId) => {
    console.log("部屋に参加");
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);

    // オファーを受信した場合の処理
    socket.on('offer', (offer, toUserId) => {
      socket.to(toUserId).emit('offer', offer, userId);
    });

    // アンサーを受信した場合の処理
    socket.on('answer', (answer, toUserId) => {
      socket.to(toUserId).emit('answer', answer, userId);
    });

    // ICE候補を受信した場合の処理
    socket.on('ice-candidate', (candidate, toUserId) => {
      socket.to(toUserId).emit('ice-candidate', candidate);
    });
    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", userId)
    })
  })
})

const port = process.env.PORT || 3000;
http.listen(port || 3000, function () {
  console.log('listening on *:' + port);
});
