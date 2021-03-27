import React from "react";
import ChatComponent from "../ChatComponent";
import "../index.css";
import StickmanComponent from "../StickmanComponent";

export default function GamePage() {
  return (
    <div className="game-layout">
      <StickmanComponent />
      <div className="chat-container">
        <ChatComponent />
      </div>
    </div>
  );
}
