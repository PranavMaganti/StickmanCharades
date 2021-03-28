import { Sprite } from "./Sprite";

export default class Stage {
  members: Sprite[];

  constructor() {
    this.members = [];
  }

  addSprite(sprite: Sprite) {
    this.members.push(sprite);
  }

  static generateStickman(x: number, y: number, length: number): Sprite {
    let root = new Sprite(x, y);

    let chest = root.addChild(0, length);
    let neck = chest.addChild(0, length);
    neck.addChild(0, length); // head

    let elbowL = neck.addChild(225, length);
    let elbowR = neck.addChild(135, length);

    elbowL.addChild(-10, length); // hand left
    elbowR.addChild(10, length); // hand right

    let kneeL = root.addChild(200, length);
    let kneeR = root.addChild(160, length);

    kneeL.addChild(0, length); // foot left
    kneeR.addChild(0, length); // foot right

    return root;
  }
}
