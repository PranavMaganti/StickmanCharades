import { Socket } from "socket.io";
import express from "express";
import cors from "cors";

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const users: Map<String, String> = new Map();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

io.on("connection", (socket: Socket) => {
  console.log("Some client connected");
  socket.on("chat", (message) => {
    console.log(message);
    io.emit("chat", { message, id: socket.id });
  });
  socket.on("requestJoinRoom", (userName: String) => {
    console.log("Connection Attempt: " + userName);
    if (Array.from(users.values()).includes(userName)) {
      socket.emit("joinRoom", { canJoin: false });
    } else {
      users.set(socket.id, userName);
      socket.emit("joinRoom", { canJoin: true });
      io.emit("users", Array.from(users.values()));
    }
  });
  socket.on("disconnect", (reason) => {
    if (Array.from(users.keys()).includes(socket.id)) {
      users.delete(socket.id);
      io.emit("users", Array.from(users.values()));
    }
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("listening on: ", port);
});
