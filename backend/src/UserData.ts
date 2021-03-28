export default class UserData {
  userName: String;
  lastGuess: String;
  score: number;
  guessed: boolean;

  constructor(userName: String) {
    this.userName = userName;
    this.lastGuess = "";
    this.score = 0;
    this.guessed = false;
  }

  incrementScore(gain: number) {
    this.score += gain;
  }

  resetScore() {
    this.score = 0;
  }
}
