import React, { useEffect, useState } from "react";
import "./index.css";
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

export default function ChatComponent() {
  const [chatMessage, setChatMessage] = useState("");
  const emptyChats: ChatMessage[] = [];
  const [chats, setChats] = useState(emptyChats);

  useEffect(() => {
    socket.on("chat", (data: { id: string; message: string }) => {
      setChats([...chats, new ChatMessage(data.id, data.message)]);
    });

    return () => {
      socket.off("chat");
    };
  });

  const submitGuess = (e: any) => {
    e.preventDefault();
    socket.emit("chat", chatMessage);
    setChatMessage("");
  };

  return (
    <div>
      <User />
      <User />
      <User />

      <form className="chat-form">
        <TextField
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
        <Button className="chat-submit" onClick={(e) => submitGuess(e)}>
          Enter
        </Button>
      </form>
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
