import { Socket } from "socket.io";
import { GameState } from "../GameState";
import { SocketReceiveLabel, SocketSendLabel } from "../SocketEndpoints";

export function stickmanMoveListener(
  socket: Socket,
  io: Socket,
  idGameMap: Map<string, GameState>
) {
  socket.on(SocketReceiveLabel.StickmanMove, (message) => {
    if (idGameMap.has(socket.id)) {
      io.to(idGameMap.get(socket.id)!!.gameId).emit(
        SocketSendLabel.StickmanMove,
        {
          message: message,
          id: socket.id,
        }
      );
    }
  });
}
