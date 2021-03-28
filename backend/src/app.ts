import { Socket } from "socket.io";
import express from "express";
import cors from "cors";
import UserData from "./UserData";
import path from "path";

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const users: Map<String, UserData> = new Map();

app.use("/", express.static(path.resolve(__dirname, '../../frontend/build')));

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
    var currentUser = users.get(socket.id);
    if (currentUser) {
      currentUser.lastGuess = message;
      console.log(socket.id + ": " + message);
      io.emit("chat", {
        message: currentUser.userName + ": " + message,
        id: socket.id,
      });
      io.emit("users", Array.from(users.values()));
    }
  });
  socket.on("requestJoinRoom", (userName: String) => {
    console.log("Connection Attempt: " + userName);
    if (
      Array.from(users.values())
        .map((user) => user.userName)
        .includes(userName)
    ) {
      socket.emit("joinRoom", { canJoin: false });
    } else {
      users.set(socket.id, new UserData(userName));
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

  socket.on("stickmanEmitMove", (message) => {
    io.emit("stickmanReceiveMove", { message: message, id: socket.id });
  });
});

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
});


const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("listening on: ", port);
});
