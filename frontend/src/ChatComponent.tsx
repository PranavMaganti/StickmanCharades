import React, { useEffect, useState } from "react";
import "./index.css";
import socket from "./socket";
import User from "./User";

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
      console.log(data.message);
      setChats([...chats, new ChatMessage(data.id, data.message)]);
    });

    return () => {
      socket.off("chat");
    };
  });

  return (
    <div>
      <User />
      <User />
      <User />

      <form className="chat-form">
        <label className="chat-label">
          Enter a message:
          <input
            type="text"
            className="chat-input"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          />
        </label>
        <button
          className="chat-submit"
          onClick={(e) => {
            e.preventDefault();
            socket.emit("chat", chatMessage);
            setChatMessage("");
          }}
        >
          Enter
        </button>
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
