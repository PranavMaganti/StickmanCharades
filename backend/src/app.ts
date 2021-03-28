import { Socket } from "socket.io";
import express from "express";
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

const words: string[] = [
  "climbing",
  "boxing",
  "disco",
  "eating",
  "yoga",
  "sword fight",
  "floss",
  "blowing a kiss",
  "tripping",
  "salute",
  "taking a phone call",
  "hopping",
  "dog",
  "ymca",
  "hurricane",
  "heads shoulders knees and toes",
  "macarena",
  "praying",
  "air guitar",
  "distraught",
  "begging",
  "coughing",
  "stretching",
  "superman",
  "teapot",
  "elderly",
];
let currentWord: string = "";

let gameStarted: boolean = false;
let usersPlayOrder: String[] = [];
let currentPlayer = 0;
let remainingPlayersGuessing = 0;

function shuffle(a: String[]): String[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function chooseWordAndSendToUsers() {
  remainingPlayersGuessing = usersPlayOrder.length - 1;
  currentWord = words[Math.floor(Math.random() * words.length)];
  let blankedWord = "";
  for (var x = 0, c = ""; (c = currentWord.charAt(x)); x++) {
    blankedWord += c == " " ? " " : "_ ";
  }
  const player = users.get(usersPlayOrder[currentPlayer]);

  if (player) {
    player.isGuesser = true;
  }

  Array.from(users.values()).forEach((it) => {
    it.resetRound();
  });

  io.to(usersPlayOrder[currentPlayer]).emit("startRound", {
    type: "player",
    word: currentWord,
  });

  Array.from(users.keys())
    .filter((it) => it != usersPlayOrder[currentPlayer])
    .forEach((element) => {
      console.log("Starting round for: ", element);
      io.to(element).emit("startRound", {
        type: "guesser",
        word: blankedWord,
      });
    });

  io.emit("users", Array.from(users.values()));
}

app.use("/", express.static(path.resolve(__dirname, "../../frontend/build")));

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
  socket.on("startGame", () => {
    if (!gameStarted) {
      usersPlayOrder = shuffle(Array.from(users.keys()));
      gameStarted = true;
      chooseWordAndSendToUsers();
    }
  });

  socket.on("chat", (message) => {
    console.log(socket.id + ": " + message);
    var currentUser = users.get(socket.id);
    if (currentUser) {
      if (!gameStarted) {
        io.emit("chat", {
          message: currentUser.userName + ": " + message,
          id: socket.id,
        });
      } else if (currentUser.guessed == false) {
        if (message.toLowerCase() == currentWord.toLowerCase()) {
          currentUser.guessed = true;
          remainingPlayersGuessing -= 1;

          currentUser.incrementScore(10);
          var currentDrawer = users.get(usersPlayOrder[currentPlayer]);
          if (currentDrawer) {
            currentDrawer.incrementScore(5);
          }

          if (remainingPlayersGuessing <= 0) {
            currentPlayer = (currentPlayer + 1) % usersPlayOrder.length;
            chooseWordAndSendToUsers();
          }
        } else {
          currentUser.lastGuess = message;
        }
      }
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
      if (gameStarted) {
        usersPlayOrder.push(socket.id);
      }
    }
  });

  socket.on("disconnect", (reason) => {
    if (Array.from(users.keys()).includes(socket.id)) {
      users.delete(socket.id);
      const removeIndex = usersPlayOrder.indexOf(socket.id);
      delete usersPlayOrder[removeIndex];
      if (removeIndex == currentPlayer) {
        // TODO: Some logic to reset the turn and go onto the next player
      }

      if (users.size < 2) {
        gameStarted = false;
      }

      io.emit("users", Array.from(users.values()));
    }
  });

  socket.on("stickmanEmitMove", (message) => {
    io.emit("stickmanReceiveMove", { message: message, id: socket.id });
  });
});

app.get("*", function (request, response) {
  response.sendFile(
    path.resolve(__dirname, "../../frontend/build", "index.html")
  );
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("listening on: ", port);
});
