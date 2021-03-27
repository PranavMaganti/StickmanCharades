import { Socket } from "socket.io";
import express from "express";
import cors from "cors";

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

io.on("connection", (socket: Socket) => {
  console.log("Some client connected");
  socket.on("chat", (message) => {
    io.emit("chat", { message, id: socket.id });
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("listening on: ", port);
});
