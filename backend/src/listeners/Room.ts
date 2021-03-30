import { Socket } from "socket.io";
import { GameState } from "../GameState";
import { SocketReceiveLabel, SocketSendLabel } from "../SocketEndpoints";

export function joinRoomListener(
  socket: Socket,
  idGameMap: Map<string, GameState>,
  games: Map<string, GameState>
) {
  socket.on(
    SocketReceiveLabel.JoinRoom,
    (data: { username: string; roomId: string }) => {
      console.log("Joining with:", data.roomId);
      if (!games.has(data.roomId)) {
        socket.emit(SocketSendLabel.JoinRoom, { roomValid: false });
        return;
      }

      console.log("Joining with:", data.roomId);

      const targetRoom = games.get(data.roomId)!!;

      if (targetRoom.addUser(socket.id, data.username)) {
        idGameMap.set(socket.id, targetRoom);
        socket.join(targetRoom.gameId);
        socket.emit(SocketSendLabel.JoinRoom, {
          roomValid: true,
          usernameValid: true,
          roomId: data.roomId,
        });
      } else {
        socket.emit(SocketSendLabel.JoinRoom, {
          roomValid: true,
          usernameValid: false,
        });
      }
    }
  );
}

export function createRoomListener(
  socket: Socket,
  io: Socket,
  idGameMap: Map<string, GameState>,
  games: Map<string, GameState>
) {
  socket.on(SocketReceiveLabel.CreateRoom, (username: string) => {
    const newGameId = Math.random().toString(20).substr(2, 6);
    console.log(newGameId);
    socket.join(newGameId);

    const newGame = new GameState(io, newGameId);
    newGame.addUser(socket.id, username);
    games.set(newGameId, newGame);
    idGameMap.set(socket.id, newGame);

    console.log("Created Room: ", newGameId);
    socket.emit(SocketSendLabel.CreateRoom, newGameId);
  });
}


export function isInRoomListener(socket: Socket, userGameMap: Map<string, GameState>, games: Map<string, GameState>) {
  socket.on(SocketReceiveLabel.CheckHasRoom, (gameId) => {
    socket.emit(SocketSendLabel.CheckHasRoom, {
      isValidGame: games.has(gameId),
      hasUsername: userGameMap.has(socket.id)
    })
  }) 
}