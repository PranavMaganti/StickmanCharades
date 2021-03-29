import { timeStamp } from "node:console";
import { Socket } from "socket.io";
import { SocketSendLabel } from "./SocketEndpoints";
import UserData from "./UserData";

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

export class GameState {
  socket: Socket;
  gameId: string;

  numberOfRounds: number;
  currentRound: number;

  currentWord: string;
  currentPlayer: number;
  guessersLeft: number;

  users: UserData[];
  userIdMap: Map<string, number>;
  usernameSet: Set<string>;

  inProgress: boolean;
  timer: number;

  constructor(
    socket: Socket,
    gameId: string,
    numberOfRounds: number = 6,
    timer: number = 120
  ) {
    this.socket = socket;
    this.gameId = gameId;

    /* Round State */
    this.numberOfRounds = numberOfRounds;
    this.currentRound = 1;

    /* Turn State */
    this.currentWord = "";
    this.currentPlayer = 0;
    this.guessersLeft = 0;

    /* Users State */
    this.users = [];
    this.userIdMap = new Map();
    this.usernameSet = new Set();

    /* General State */
    this.inProgress = false;
    this.timer = timer;
  }

  startGame() {
    this.inProgress = true;
    this.startTurn();
  }

  startTurn() {
    this.currentWord = words[Math.floor(Math.random() * words.length)];
    this.guessersLeft = this.users.length - 1;
    this.users.forEach((it, index) => {
      it.resetUser(index != this.currentPlayer);
    });

    this.emitUsers()
  }

  endTurn(): boolean {
    if (this.currentPlayer + 1 >= this.users.length) {
      this.currentPlayer = 0;
      this.currentRound += 1;
    } else {
      this.currentPlayer += 1;
    }

    return this.currentRound > this.numberOfRounds;
  }

  addUser(userId: string, username: string): boolean {
    if (this.usernameSet.has(username)) {
      return false;
    }
    this.usernameSet.add(username);
    const user = new UserData(userId, username);
    this.users.push(user);
    /* TODO: Look into case where multiple people added at the same time */
    this.userIdMap.set(user.userId, this.users.length);

    this.guessersLeft += 1;
    this.emitUsers()

    return true;
  }

  removeUser(userId: string) {
    this.guessersLeft -= 1;
    const user = this.users[this.userIdMap.get(userId)!!];
    const playerIndex = this.users.indexOf(user);

    delete this.users[playerIndex];

    // Decrement this as we have removed the player at the currentPlayer index
    this.currentPlayer -= 1;
    this.endTurn();

    this.emitUsers()
  }

  checkUserGuess(guess: string, userId: string, time: number) {
    const user = this.users[this.userIdMap.get(userId)!!];
    if (guess == this.currentWord) {
      user.setGuessed(time);
    } else {
      user.lastGuess = guess;
    }

    this.emitUsers();
  }

  private emitUsers() {
    this.socket.to(this.gameId).emit(SocketSendLabel.Users, this.users);
  }
}

function shuffle(a: String[]): String[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
