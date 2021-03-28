import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import ChatComponent from "../ChatComponent";
import "../index.css";
import StickmanComponent from "../StickmanComponent";

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

export default function GamePage() {
  const classes = useStyles();

  return (
    <div className="flex-row">
      <Card className={classes.allMargin} variant="outlined">
        <StickmanComponent />
      </Card>
      <div>
        <ChatComponent />
      </div>
    </div>
  );
}
