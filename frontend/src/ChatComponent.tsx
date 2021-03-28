import React, { useEffect, useState } from "react";
import "./index.css";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import socket from "./socket";
import User from "./User";
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
  const [users, setUsers] = useState<Array<String>>([]);
  const classes = useStyles();

  useEffect(() => {
    socket.on("chat", (data: { id: string; message: string }) => {
      setChats([...chats, new ChatMessage(data.id, data.message)]);
    });

    socket.on("users", (serverUsers: Array<String>) => {
      setUsers(serverUsers);
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

  return (
    <div>
      {users.map((user: String, index: any) => (
        <Card
          className={classes.marginAndPadding}
          variant="outlined"
          key={index}
        >
          <User userName={user} key={index} />
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
              if (ev.key === "Enter") {
                submitGuess(ev);
              }
            }}
          />
          <Button
            className="chat-submit"
            onClick={(e) => submitGuess(e)}
            variant="outlined"
            color="secondary"
          >
            Enter
          </Button>
        </form>
      </Card>
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

// ReactDOM.render(<ChatComponent />, document.getElementById("root"));
