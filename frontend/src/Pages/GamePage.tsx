import React from "react";
import ChatComponent from "../ChatComponent";
import "../index.css";

export default function GamePage() {
  return (
    <div className="game-layout">
      <canvas></canvas>
      <div className="chat-container">
        <ChatComponent />
      </div>
    </div>
  );
}
