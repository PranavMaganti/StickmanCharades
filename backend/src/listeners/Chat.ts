import { Socket } from "socket.io";
import { GameState } from "../GameState";
import { SocketReceiveLabel, SocketSendLabel } from "../SocketEndpoints";

export default function chatListener(
  socket: Socket,
  io: Socket,
  idGameMap: Map<string, GameState>
) {
  socket.on(SocketReceiveLabel.Chat, (message) => {
    const game = idGameMap.get(socket.id)!!;
    if (game.inProgress) {
      game.checkUserGuess(message, socket.id, 60);
    } else {
      io.emit(SocketSendLabel.Chat, { message: message, id: socket.id });
    }
  });
}
