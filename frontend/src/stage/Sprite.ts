import { SpriteNode } from "./SpriteNode";
import { IPoint } from "./IPoint";
import { Shape } from "./Shape";

export { Sprite };

class Sprite implements IPoint {
  sprites: SpriteNode[];

  rootX: number;
  rootY: number;

  constructor(rootX: number, rootY: number) {
    this.rootX = rootX;
    this.rootY = rootY;
    this.sprites = [];
  }

  getSquaredDistanceFrom(x: number, y: number): number {
    return (x - this.getX()) ** 2 + (y - this.getY()) ** 2;
  }

  getAngle(): number {
    return 0;
  }

  getX(): number {
    return this.rootX;
  }

  getY(): number {
    return this.rootY;
  }

  movePos(newX: number, newY: number): void {
    this.rootX = newX;
    this.rootY = newY;
  }

  addChild(
    angle: number,
    length: number,
    limbShape: Shape = Shape.Line
  ): SpriteNode {
    let newNode = new SpriteNode(this, angle, length, limbShape);
    this.sprites.push(newNode);
    return newNode;
  }

  getChildCount(): number {
    return this.sprites.length;
  }

  getChild(index: number): SpriteNode {
    return this.sprites[index];
  }

  removeChild(child: SpriteNode): void {
    this.sprites.filter((item) => item !== child);
  }
}
