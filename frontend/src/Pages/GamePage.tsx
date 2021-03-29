import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import ChatComponent from "../components/ChatComponent";
import StickmanComponent from "../components/StickmanComponent";
import "../index.css";

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
  const [flexDirection, setFlexDirection] = useState("flex-row");
  const classes = useStyles();

  const resizeListener = () => {
    if (window.innerHeight > window.innerWidth) {
      setFlexDirection("flex-col");
    } else {
      setFlexDirection("flex-row");
    }
  };
  useEffect(() => {
    resizeListener();
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return (
    <div className={flexDirection}>
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
