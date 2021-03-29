export default class UserData {
  userId: string
  username: String;
  lastGuess: String;
  score: number;
  guessed: boolean;
  isGuesser: boolean;

  constructor(userId: string, username: String) {
    this.userId = userId
    this.username = username;
    this.score = 0;

    this.lastGuess = "";
    this.guessed = false;
    this.isGuesser = false;
  }

  resetUser(isGuesser: boolean) {
    this.lastGuess = ""
    this.isGuesser = isGuesser;
    this.guessed = !isGuesser
  }

  setGuessed(time: number) {
    this.score += time;
    this.guessed = true;
    this.lastGuess = ""
  }

  resetScore() {
    this.score = 0;
  }
}
