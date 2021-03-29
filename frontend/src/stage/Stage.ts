import { Shape } from "./Shape";
import { Sprite } from "./Sprite";

export default class Stage {
  members: Sprite[];

  constructor() {
    this.members = [];
  }

  addSprite(sprite: Sprite): void {
    this.members.push(sprite);
  }

  static generateStickman(x: number, y: number, length: number): Sprite {
    const root = new Sprite(x, y);

    const chest = root.addChild(0, length);
    const neck = chest.addChild(0, length);
    neck.addChild(0, length, Shape.Circle); // head

    const elbowL = neck.addChild(225, length);
    const elbowR = neck.addChild(135, length);

    elbowL.addChild(-10, length); // hand left
    elbowR.addChild(10, length); // hand right

    const kneeL = root.addChild(200, length);
    const kneeR = root.addChild(160, length);

    kneeL.addChild(0, length); // foot left
    kneeR.addChild(0, length); // foot right

    return root;
  }
}
