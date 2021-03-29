import { Socket } from "socket.io";
import { GameState } from "../GameState";
import { SocketReceiveLabel } from "../SocketEndpoints";

export default function disconnectListener(
  socket: Socket,
  userGameMap: Map<string, GameState>,
  games: Map<string, GameState>
) {
  socket.on(SocketReceiveLabel.Disconnect, (reason) => {
    const game = userGameMap.get(socket.id);
    if (game != undefined) {
      game.removeUser(socket.id);
      userGameMap.delete(socket.id);

      if (game.users.length <= 0) {
        games.delete(game.gameId);
      }

      socket.leave(game.gameId);
    }
  });
}
