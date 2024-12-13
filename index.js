const express = require("express");
const serverless = require("serverless-http");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let Usercounter = 0;

// Rute untuk file index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// WebSocket handler
io.on("connection", function (socket) {
  Usercounter++;
  io.emit("user", Usercounter);
  console.log("a user is connected");

  socket.on("disconnect", function () {
    Usercounter--;
    io.emit("user", Usercounter);
    console.log("user disconnected");
  });

  socket.on("audioMessage", function (msg) {
    io.emit("audioMessage", msg);
  });
});

// Export for Vercel serverless function
module.exports = app;
module.exports.handler = serverless(app);