import { SpriteNode } from "./SpriteNode"
import { Point } from "./Point";

export { Sprite }

class Sprite implements Point {
    private children: SpriteNode[];

    private rootX: number;
    private rootY: number;

    constructor(rootX: number, rootY: number) {
        this.rootX = rootX;
        this.rootY = rootY;
        this.children = [];
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
        this.children.filter(item => item !== child);
    }
}