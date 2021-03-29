import { io } from "socket.io-client";

// const port = process.env.PORT || 5000;
const URL = "http://localhost:5000/";
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

socket.connect();

export default socket;
