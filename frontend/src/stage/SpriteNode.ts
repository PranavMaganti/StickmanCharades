import { IPoint } from "./IPoint";

export { SpriteNode };

class SpriteNode implements IPoint {
  children: SpriteNode[];
  parent: IPoint;

  angle: number;
  length: number;

  constructor(parent: IPoint, angle: number, length: number) {
    this.children = [];
    this.angle = angle % 360;
    this.length = length;
    this.parent = parent;
  }

  getSquaredDistanceFrom(x: number, y: number): number {
    return (x - this.getX()) ** 2 + (y - this.getY()) ** 2;
  }

  getAngle(): number {
    return this.parent.getAngle() + this.angle;
  }

  getX(): number {
    return (
      this.parent.getX() +
      Math.sin((this.getAngle() * Math.PI) / 180) * this.length
    );
  }

  getY(): number {
    return (
      this.parent.getY() -
      Math.cos((this.getAngle() * Math.PI) / 180) * this.length
    );
  }

  setAngle(angle: number) {
    angle = angle % 360;
    this.angle = angle - this.parent.getAngle();
  }

  setLength(length: number) {
    this.length = length;
  }

  addChild(angle: number, length: number): SpriteNode {
    let newNode = new SpriteNode(this, angle, length);
    this.children.push(newNode);
    return newNode;
  }

  getChildCount(): number {
    return this.children.length;
  }

  getChild(index: number): SpriteNode {
    return this.children[index];
  }

  removeChild(child: SpriteNode): void {
    this.children.filter((item) => item !== child);
  }
}
