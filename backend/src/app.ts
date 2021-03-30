import { Socket } from "socket.io";
import express from "express";
import path from "path";
import { GameState } from "./GameState";
import { SocketReceiveLabel, SocketSendLabel } from "./SocketEndpoints";
import chatListener from "./listeners/Chat";
import disconnectListener from "./listeners/Disconnect";
import {
  createRoomListener,
  isInRoomListener,
  joinRoomListener,
} from "./listeners/Room";
import { stickmanMoveListener } from "./listeners/Stickman";
import { getUsersListener } from "./listeners/Users";
import { startGameListener } from "./listeners/Game";
import SocketIO from "socket.io";

const port = process.env.PORT || 5000;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use("/", express.static(path.resolve(__dirname, "../../frontend/build")));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("*", (_, response) =>
  response.sendFile(
    path.resolve(__dirname, "../../frontend/build", "index.html")
  )
);
server.listen(port, () => {
  console.log("listening on: ", port);
});

const games = new Map<string, GameState>();
const userGameMap = new Map<string, GameState>();

io.on(SocketReceiveLabel.Connect, (socket: Socket) => {
  console.log("Some client connected");
  disconnectListener(socket, userGameMap, games);

  joinRoomListener(socket, userGameMap, games);
  createRoomListener(socket, io, userGameMap, games);
  isInRoomListener(socket, userGameMap, games);

  stickmanMoveListener(socket, io, userGameMap);
  chatListener(socket, io, userGameMap);

  getUsersListener(socket, games);

  startGameListener(socket, userGameMap);
});
