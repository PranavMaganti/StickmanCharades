export default class UserData {
  userName: String;
  lastGuess: String;

  constructor(userName: String) {
    this.userName = userName;
    this.lastGuess = "";
  }
}
