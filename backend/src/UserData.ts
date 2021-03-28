export default class UserData {
  userName: String;
  lastGuess: String;
  score: number;

  constructor(userName: String) {
    this.userName = userName;
    this.lastGuess = "";
    this.score = 0;
  }

  incrementScore(gain: number) {
    this.score += gain;
  }

  resetScore() {
    this.score = 0;
  }
}
