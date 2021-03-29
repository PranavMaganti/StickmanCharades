import { Socket } from "socket.io";
import { GameState } from "../GameState";

export function startGameListener(
  socket: Socket,
  userGameMap: Map<string, GameState>
) {
  socket.on("startGame", () => {
    const game = userGameMap.get(socket.id);
    game!!.startGame();
  });
}
