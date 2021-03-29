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

export default function MainPage(): React.ReactElement {
  const [username, setUserName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const [validUsername, setValidUsername] = useState(true);
  const [validRoomCode, setValidRoomCode] = useState(true);

  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    socket.on(
      "joinRoom",
      (arg: { usernameValid: boolean; roomId: string; roomValid: boolean }) => {
        if (!arg.roomValid) {
          setValidRoomCode(false);
        } else if (!arg.usernameValid) {
          setValidUsername(false);
        } else {
          history.push("/play/" + arg.roomId);
        }
      }
    );

    socket.on("createRoomSuccess", (roomId: string) => {
      history.push("/play/" + roomId);
    });
  });

  return (
    <Container maxWidth="sm" className={classes.hugeTopMargin}>
      <Card variant="outlined">
        <Typography variant="h3" className={classes.topMargin}>
          charades.me
        </Typography>
        <Container maxWidth="sm">
          <form className="input-fields">
            <TextField
              className={classes.bothMargin}
              error={!validUsername}
              helperText={
                !validUsername ? "The username is already in use" : ""
              }
              defaultValue="PlayerX"
              label="Nickname"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
                setValidUsername(true);
              }}
            />

            <TextField
              className={classes.bothMargin}
              error={!validRoomCode}
              helperText={!validRoomCode ? "This is not a valid room code" : ""}
              label="Room Code"
              value={roomCode}
              onChange={(e) => {
                setRoomCode(e.target.value);
                setValidRoomCode(true);
              }}
            />

            <Button
              className={classes.bothMargin}
              variant="contained"
              color="secondary"
              onClick={() => {
                socket.emit("requestJoinRoom", {
                  roomId: roomCode,
                  username: username,
                });
              }}
              disabled={username == ""}
            >
              Join Game
            </Button>

            <Button
              className={classes.bothMargin}
              variant="contained"
              color="secondary"
              onClick={() => {
                console.log("Creating room");
                socket.emit("createRoom", username);
              }}
              disabled={username == ""}
            >
              Or start a new room!
            </Button>
          </form>
        </Container>
      </Card>
    </Container>
  );
}
