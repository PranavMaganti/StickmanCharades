import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import socket from "../socket";
import GamePage from "./GamePage";
import MainPage from "./MainPage";

export default function LoadingGamePage(): React.ReactElement {
  const { gameId } = useParams();

  const [isValidGame, setIsValidGame] = useState<boolean>(false);
  const [hasUsername, setHasUsername] = useState<boolean>(false);
  const [serverChecked, setServerChecked] = useState<boolean>(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const { allValid } = state
    ? (state as { allValid: boolean })
    : { allValid: false };

  useEffect(() => {
    if (!allValid) {
      socket.emit("checkHasRoom", gameId);

      socket.on(
        "checkHasRoom",
        (data: { isValidGame: boolean; hasUsername: boolean }) => {
          if (!data.isValidGame) {
            navigate("/");
          }
          setHasUsername(data.hasUsername);
          setIsValidGame(data.isValidGame);
          setServerChecked(true);
        }
      );
    }
  }, [gameId, navigate, allValid]);

  if (allValid) {
    return <GamePage />;
  } else if (!serverChecked) {
    return <p>LOADING............................</p>;
  } else if (isValidGame && hasUsername) {
    return <GamePage />;
  } else {
    return <MainPage gameId={isValidGame ? gameId : undefined} />;
  }
}
