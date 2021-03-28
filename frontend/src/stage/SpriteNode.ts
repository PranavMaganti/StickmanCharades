import { IPoint } from "./IPoint";
import { Shape } from "./Shape";

export { SpriteNode };

class SpriteNode implements IPoint {
  children: SpriteNode[];
  parent: IPoint;

  limbShape: Shape;
  angle: number;
  length: number;

  constructor(parent: IPoint, angle: number, length: number, limbShape: Shape) {
    this.children = [];
    this.angle = angle % 360;
    this.length = length;
    this.parent = parent;
    this.limbShape = limbShape;
  }

  static fromJson(parent: IPoint, json: string): SpriteNode {
    const partial: {
      angle: number;
      length: number;
      limbShape: number;
      children: string[];
    } = JSON.parse(json);

    const node = new SpriteNode(
      parent,
      partial.angle,
      partial.length,
      partial.limbShape
    );
    partial.children.forEach((it) =>
      node.addChildNode(SpriteNode.fromJson(node, it))
    );
    return node;
  }

  toJson(): string {
    return JSON.stringify({
      angle: this.angle,
      length: this.length,
      children: this.children.map((it) => it.toJson()),
      limbShape: this.limbShape.valueOf(),
    });
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

  addChildNode(node: SpriteNode) {
    this.children.push(node);
  }

  addChild(
    angle: number,
    length: number,
    limbShape: Shape = Shape.Line
  ): SpriteNode {
    let newNode = new SpriteNode(this, angle, length, limbShape);
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
