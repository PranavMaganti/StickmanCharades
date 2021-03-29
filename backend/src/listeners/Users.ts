import { Socket } from "socket.io";
import { GameState } from "../GameState";
import { SocketReceiveLabel, SocketSendLabel } from "../SocketEndpoints";

export function getUsersListener(
  socket: Socket,
  games: Map<string, GameState>
) {
  socket.on(SocketReceiveLabel.Users, (gameId) => {
    socket.emit(SocketSendLabel.Users, games.get(gameId)?.users);
  });
}
