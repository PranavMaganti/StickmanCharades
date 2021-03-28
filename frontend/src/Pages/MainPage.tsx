import React, { useEffect, useState } from "react";
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
    marginTop: 5,
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
  const [validUsername, setValidUsername] = useState(true);
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    socket.on("joinRoom", (arg: { canJoin: boolean }) => {
      if (arg.canJoin) {
        history.push("/play");
      } else {
        setValidUsername(false);
      }
    });
  });

  return (
    <Container maxWidth="sm" className={classes.hugeTopMargin}>
      <Card>
        <Typography variant="h2">charades.me</Typography>
        <Container maxWidth="sm" className={classes.bothMargin}>
          <form className="input-fields">
            <TextField
              className={classes.bothMargin}
              error={!validUsername}
              helperText={
                !validUsername ? "The username is already in use" : ""
              }
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
                socket.emit("requestJoinRoom", userName);
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
