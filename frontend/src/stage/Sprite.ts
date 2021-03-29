import { SpriteNode } from "./SpriteNode";
import { IPoint } from "./IPoint";
import { Shape } from "./Shape";

export { Sprite };

class Sprite implements IPoint {
  sprites: SpriteNode[];

  rootX: number;
  rootY: number;

  constructor(rootX: number, rootY: number, sprites: SpriteNode[] = []) {
    this.rootX = rootX;
    this.rootY = rootY;
    this.sprites = sprites;
  }

  toJson(): string {
    return JSON.stringify({
      rootX: this.rootX,
      rootY: this.rootY,
      sprites: this.sprites.map((it) => it.toJson()),
    });
  }

  static fromJson(json: string): Sprite {
    const partial: {
      rootX: number;
      rootY: number;
      sprites: string[];
    } = JSON.parse(json);

    const sprite = new Sprite(partial.rootX, partial.rootY);
    partial.sprites.forEach((it) =>
      sprite.addChildNode(SpriteNode.fromJson(sprite, it))
    );
    return sprite;
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

  addChildNode(node: SpriteNode): void {
    this.sprites.push(node);
  }

  addChild(
    angle: number,
    length: number,
    limbShape: Shape = Shape.Line
  ): SpriteNode {
    const newNode = new SpriteNode(this, angle, length, limbShape);
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
