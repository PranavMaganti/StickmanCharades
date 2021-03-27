import React, { useState } from "react";
import { Container, TextField, Button } from "@material-ui/core";
import ReactDOM from "react-dom";
import "./index.css";

export default function FrontPage() {
  const [userName, setUserName] = useState("");
  const [roomCode, setRoomCode] = useState("");

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

        <Button variant="contained" color="primary">
          Join Game
        </Button>

        <Button>Or start a new room!</Button>
      </form>
    </Container>
  );
}

ReactDOM.render(<FrontPage />, document.getElementById("root"));
