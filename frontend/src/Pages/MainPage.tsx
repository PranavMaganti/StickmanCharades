import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, TextField, Button } from "@material-ui/core";
import "../index.css";
import socket from "../socket";

export default function MainPage() {
  const [userName, setUserName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const history = useHistory();

  return (
    <Container maxWidth="sm" style={{ textAlign: "center" }}>
      <h1>Charades.me</h1>
      <form className="input-fields">
        <TextField
          className="name-input"
          defaultValue="PlayerX"
          label="Nickname"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <TextField
          className="room-input"
          label="Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            socket.connect();
            history.push("/play");
          }}
        >
          Join Game
        </Button>

        <Button>Or start a new room!</Button>
      </form>
    </Container>
  );
}
