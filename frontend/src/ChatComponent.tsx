import React, {useMemo, useEffect, useState } from "react";
import io from "socket.io-client";
import "./index.css";

const ENDPOINT = "http://localhost:5000";

class ChatMessage {
  senderId: string;
  message: string;

  constructor(senderId: string, message: string) {
    this.senderId = senderId;
    this.message = message;
  }
}

export default function ChatComponen() {
  const [chatMessage, setChatMessage] = useState("");
  const emptyChats: ChatMessage[] = [];
  const [chats, setChats] = useState(emptyChats);
  const socket = useMemo(() => io.connect(ENDPOINT), []);

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
