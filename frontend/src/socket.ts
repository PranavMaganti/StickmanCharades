import { io } from "socket.io-client";

const heroku = process.env.heroku == "true";
const URL = heroku
  ? "https://stickman-charades.herokuapp.com/"
  : "http://localhost:5000";
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

socket.connect();

export default socket;
