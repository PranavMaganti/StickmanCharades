import { Socket } from "socket.io";
import { GameState } from "../GameState";
import { SocketReceiveLabel } from "../SocketEndpoints";

export default function disconnectListener(
  socket: Socket,
  idGameMap: Map<string, GameState>,
  games: Map<string, GameState>
) {
  socket.on(SocketReceiveLabel.Disconnect, (reason) => {
    const game = idGameMap.get(socket.id);
    if (game != undefined) {
      game.removeUser(socket.id);
      idGameMap.delete(socket.id);

      if (game.users.length <= 0) {
        games.delete(game.gameId);
      }

      socket.leave(game.gameId);
    }
  });
}
