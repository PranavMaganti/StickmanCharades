import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Card,
  Typography,
} from "@material-ui/core";
import "../index.css";
import socket from "../socket";

const useStyles = makeStyles({
  topMargin: {
    marginTop: 20,
    textAlign: "center",
  },
  bottomMargin: {
    marginBottom: 5,
    textAlign: "center",
  },
  bothMargin: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
  },
  hugeTopMargin: {
    marginTop: 200,
    textAlign: "center",
  },
});

export default function MainPage() {
  const [userName, setUserName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const history = useHistory();
  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.hugeTopMargin}>
      <Card variant="outlined">
        <Typography variant="h3" className={classes.topMargin}>
          charades.me
        </Typography>
        <Container maxWidth="xs">
          <form className="input-fields">
            <TextField
              className={classes.bothMargin}
              defaultValue="PlayerX"
              label="Nickname"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <TextField
              className={classes.bothMargin}
              label="Room Code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />

            <Button
              className={classes.bothMargin}
              variant="contained"
              color="secondary"
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
      </Card>
    </Container>
  );
}
