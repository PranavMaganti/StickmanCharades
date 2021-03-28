export default class UserData {
  userName: String;
  lastGuess: String;
  score: number;

  constructor(userName: String) {
    this.userName = userName;
    this.lastGuess = "";
    this.score = 0;
  }
}
