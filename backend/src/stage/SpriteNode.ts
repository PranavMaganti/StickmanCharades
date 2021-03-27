import { List } from "./List"
import { SpriteRoot } from "./SpriteRoot";
import { Point } from "./Point"

export { SpriteNode }

class SpriteNode implements Point {
    private children: List<SpriteNode>;
    private parent: Point;

    private angle: number;
    private length: number;

    constructor(parent: Point, angle: number, length: number) {
        this.children = new List<SpriteNode>();
        this.angle = angle;
        this.length = length;
        this.parent = parent;
    }

    getX(): number {
        return this.parent.getX() + Math.sin(this.angle * Math.PI / 180) * this.length;
    }

    getY(): number {
        return this.parent.getY() + Math.cos(this.angle * Math.PI / 180) * this.length;
    }

    addChild(angle: number, length: number): void {
        this.children.add(new SpriteNode(this, angle, length));
    }

    getChildCount(): number {
        return this.children.size();
    }

    getChild(index: number): SpriteNode {
        return this.children.get(index);
    }

    removeChild(child: SpriteNode): void {
        this.children.remove(child);
    }
}