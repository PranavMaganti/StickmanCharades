import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

class ChatMessage {
  senderId: string;
  message: string;

  constructor(senderId: string, message: string) {
    this.senderId = senderId;
    this.message = message;
  }
}

export default function ClientComponent(props: {
  socket: SocketIOClient.Socket;
}) {
  const [chatMessage, setChatMessage] = useState("");

  const emptyChats: ChatMessage[] = [];
  const [chats, setChats] = useState(emptyChats);

  useEffect(() => {
    props.socket.on("chat", (data: { id: string; message: string }) => {
      console.log(data.message);
      setChats([...chats, new ChatMessage(data.id, data.message)]);
    });
  });

  return (
    <div>
      <form className="chat-form">
        {chats.forEach((chatMsg: ChatMessage) => {
          <p
            style={{
              color: chatMsg.senderId == props.socket.id ? "blue" : "black",
            }}
          >
            {chatMsg.message}
          </p>;
        })}
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
            props.socket.emit("chat", chatMessage);
            setChatMessage("");
          }}
        >
          Enter
        </button>
      </form>
    </div>
  );
}

const socketClient = socketIOClient(ENDPOINT);

ReactDOM.render(
  <ClientComponent socket={socketClient} />,
  document.getElementById("root")
);
