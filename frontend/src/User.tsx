import React from "react";
import "./index.css";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  padding: {
    padding: 5,
  },
  leftMargin: {
    marginLeft: 20,
  },
  marginAndPadding: {
    margin: 5,
    padding: 5,
  },
});

export default function User() {
  const classes = useStyles();
  return (
    <div className="flex-row">
      <Avatar>D</Avatar>
      <div className={[classes.leftMargin, "flex-col"].join(" ")}>
        <Typography variant="body1" gutterBottom>
          Dave
        </Typography>
        <Typography variant="body2" gutterBottom>
          Most recent guess: Chicken!
        </Typography>
      </div>
    </div>
  );
}
