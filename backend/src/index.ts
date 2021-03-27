import { Socket } from "socket.io";
import express from "express";
import path from "path";

// index.js
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "../static")));

io.on("connection", (socket: Socket) => {
  console.log("Some client connected");
  socket.on("chat", (message) => {
    io.emit("chat", { message, id: socket.id });
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("listening on: ", port);
});
