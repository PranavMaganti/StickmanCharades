import React from "react";
import "./index.css";
import avatar from "./Assets/user.jpg";

export default function User(prop: { userName: String }) {
  return (
    <div className="flex-row">
      <img src={avatar} className="user-img"></img>
      <div className="flex-col">
        <p>{prop.userName}</p>
        <p>Recent Chat</p>
      </div>
    </div>
  );
}
