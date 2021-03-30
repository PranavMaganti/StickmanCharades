export class SocketReceiveLabel {
  static Chat = "chat"

  static JoinRoom = "requestJoinRoom"
  static CreateRoom = "createRoom"
  static CheckHasRoom = "checkHasRoom"

  static Connect = "connection"
  static Disconnect = "disconnect"

  static Users = "getUsers"

  static StickmanMove = "stickmanEmitMove"
}

export class SocketSendLabel {
  static CreateRoom = "createRoomSuccess"
  static Chat = "chat"
  static CheckHasRoom = "checkHasRoom"

  static EndGame = "endGame";
  static StartGame = "startGame";
  static Users = "setUsers";
  static StickmanMove = "stickmanReceiveMove"
  static JoinRoom = "joinRoom"
}
