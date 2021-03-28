import React, { useEffect, useState } from "react";
import "./index.css";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import socket from "./socket";
import User from "./User";
import UserData from "../../backend/src/UserData";
import { TextField, Button } from "@material-ui/core";
class ChatMessage {
  senderId: string;
  message: string;

  constructor(senderId: string, message: string) {
    this.senderId = senderId;
    this.message = message;
  }
}

const useStyles = makeStyles({
  chatContainer: {
    verticalAlign: "center",
    margin: 5,
    padding: 10,
  },
  padding: {
    padding: 5,
  },
  margin: {
    margin: 5,
  },
  marginAndPadding: {
    margin: 5,
    padding: 5,
  },
});

export default function ChatComponent() {
  const [chatMessage, setChatMessage] = useState("");
  const emptyChats: ChatMessage[] = [];
  const [chats, setChats] = useState(emptyChats);
  const [users, setUsers] = useState<Array<UserData>>([]);
  const classes = useStyles();
  const [userGuessed, setUserGuessed] = useState(false);
  const [isGuesser, setIsGuesser] = useState(true);

  useEffect(() => {
    socket.on("chat", (data: { id: string; message: string }) => {
      setChats([...chats, new ChatMessage(data.id, data.message)]);
    });

    socket.on("users", (serverUsers: Array<UserData>) => {
      setUsers(serverUsers);
    });

    socket.on("startRound", (data: { type: string; word: string }) => {
      setIsGuesser(data.type == "guesser");
    });

    socket.on("userComplete", (username: string, id: string) => {
      users.forEach((it) => {
        if (it.userName == username) {
          it.lastGuess = "";
          it.guessed = true;
        }
      });

      if (socket.id == id) {
        setUserGuessed(true);
      }
    });

    return () => {
      socket.off("chat");
      socket.off("users");
    };
  });

  const submitGuess = (e: any) => {
    e.preventDefault();
    socket.emit("chat", chatMessage);
    setChatMessage("");
  };
  console.log(users);

  return (
    <div>
      {users.map((user: UserData, index: any) => (
        <Card
          className={classes.marginAndPadding}
          variant="outlined"
          key={index}
        >
          <User
            userName={user.userName}
            lastGuess={user.lastGuess}
            score={user.score}
            guessedCorrect={user.guessed}
            key={index}
          />
        </Card>
      ))}

      <Card className={classes.chatContainer} variant="outlined">
        <form className="chat-form">
          <TextField
            variant="outlined"
            color="secondary"
            className="chat-input"
            label="Guess"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={(ev) => {
              if (ev.key === "Enter" && !(userGuessed || !isGuesser)) {
                submitGuess(ev);
              }
            }}
          />
          <Button
            className="chat-submit"
            onClick={(e) => submitGuess(e)}
            variant="outlined"
            color="secondary"
            disabled={userGuessed || !isGuesser}
          >
            Enter
          </Button>
        </form>
      </Card>
      <div>
        <Button
          className="game-start"
          onClick={() => {
            socket.emit("startGame");
          }}
          variant="contained"
          color="secondary"
        >
          START
        </Button>
      </div>
      <div>
        {chats.map((value, index) => {
          return (
            <p
              className={value.senderId == socket.id ? "curr" : "other"}
              key={index}
            >
              {value.message}
            </p>
          );
        })}
      </div>
    </div>
  );
}
