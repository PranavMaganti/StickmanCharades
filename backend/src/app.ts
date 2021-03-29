import { Socket } from "socket.io";
import express from "express";
import path from "path";
import { GameState } from "./GameState";
import { SocketReceiveLabel, SocketSendLabel } from "./SocketEndpoints";

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
const idGameMap = new Map<string, GameState>();
var roomId = 0;

io.on(SocketReceiveLabel.Connect, (socket: Socket) => {
  console.log("Some client connected");
  socket.on(SocketReceiveLabel.Disconnect, (reason) => {
    const game = idGameMap.get(socket.id);
    if (game != undefined) {
      game.removeUser(socket.id);
      idGameMap.delete(socket.id);

      if (game.users.length <= 0) {
        games.delete(game.gameId);
      }
    }
  });

  socket.on(SocketReceiveLabel.Chat, (message) => {
    const game = idGameMap.get(socket.id)!!;
    if (game.inProgress) {
      game.checkUserGuess(message, socket.id, 60);
    } else {
      io.emit(SocketSendLabel.Chat, message);
    }
  });

  socket.on(
    SocketReceiveLabel.JoinRoom,
    (data: { username: string; roomId: string }) => {
      console.log("Joining with:", data.roomId);
      if (!games.has(data.roomId)) {
        socket.emit(SocketSendLabel.JoinRoom, { roomValid: false });
        return;
      }

      console.log("Joining with:", data.roomId);

      const targetRoom = games.get(data.roomId);

      if (targetRoom!!.addUser(socket.id, data.username)) {
        socket.emit(SocketSendLabel.JoinRoom, {
          roomValid: true,
          usernameValid: true,
          roomId: data.roomId,
        });
      } else {
        socket.emit(SocketSendLabel.JoinRoom, {
          roomValid: true,
          usernameValid: false,
        });
      }
    }
  );

  socket.on(SocketReceiveLabel.CreateRoom, (username: string) => {
    const newGameId = roomId.toString();
    roomId += 1;
    socket.join(newGameId);

    const newGame = new GameState(io, newGameId);
    newGame.addUser(socket.id, username);
    games.set(newGameId, newGame);
    idGameMap.set(socket.id, newGame);

    console.log("Created Room: ", newGameId);
    socket.emit(SocketSendLabel.CreateRoom, newGameId);
  });

  socket.on(SocketReceiveLabel.Users, (gameId) => {
    socket.emit(SocketSendLabel.Users, games.get(gameId)?.users);
  });

  socket.on(SocketReceiveLabel.StickmanMove, (message) => {
    io.to(idGameMap.get(socket.id)?.gameId).emit(SocketSendLabel.StickmanMove, {
      message: message,
      id: socket.id,
    });
  });
});
