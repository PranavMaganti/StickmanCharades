import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core"
import ReactDOM from "react-dom";
import io from "socket.io-client";
import "./index.css";


export default function FrontPage() {
  const [chatMessage, setChatMessage] = useState("");

  return (
    <div>
      
    </div>
  );
}

ReactDOM.render(<FrontPage />, document.getElementById("root"));
