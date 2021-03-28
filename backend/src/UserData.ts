export default class UserData {
  userName: String;
  lastGuess: String;
  score: number;
  guessed: boolean;
  isGuesser: boolean;

  constructor(userName: String) {
    this.userName = userName;
    this.lastGuess = "";
    this.score = 0;
    this.guessed = false;
    this.isGuesser = false;
  }

  resetRound() {
    this.lastGuess = "";
    this.guessed = false;
    this.isGuesser = false;
  }

  incrementScore(gain: number) {
    this.score += gain;
  }

  resetScore() {
    this.score = 0;
  }
}
