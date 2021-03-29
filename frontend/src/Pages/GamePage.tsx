import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import ChatComponent from "../components/ChatComponent";
import "../index.css";
import StickmanComponent from "../components/StickmanComponent";

const useStyles = makeStyles({
  topMargin: {
    marginTop: 5,
    textAlign: "center",
  },
  bottomMargin: {
    marginBottom: 5,
    textAlign: "center",
  },
  allMargin: {
    margin: 5,
    textAlign: "center",
  },
  hugeTopMargin: {
    marginTop: 200,
    textAlign: "center",
  },
});

export default function GamePage(): React.ReactElement {
  const classes = useStyles();

  return (
    <div className="play-area">
      <Card
        className={[classes.allMargin, "fixed-aspect"].join(" ")}
        variant="outlined"
        id="stickman-container"
      >
        <StickmanComponent />
      </Card>
      <div id="chat-container">
        <ChatComponent />
      </div>
    </div>
  );
}
