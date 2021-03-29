export default class UserData {
  userId: string
  username: string;
  lastGuess: string;
  score: number;
  guessed: boolean;
  isGuesser: boolean;
  word: string

  constructor(userId: string, username: string) {
    this.userId = userId
    this.username = username;
    this.score = 0;

    this.lastGuess = "";
    this.guessed = false;
    this.isGuesser = false;
    this.word = ""
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
