import { Point } from "./Point"

export { SpriteNode }

class SpriteNode implements Point {
    private children: SpriteNode[];
    private parent: Point;

    private angle: number;
    private length: number;

    constructor(parent: Point, angle: number, length: number) {
        this.children = [];
        this.angle = angle % 360;
        this.length = length;
        this.parent = parent;
    }

    getX(): number {
        return this.parent.getX() + Math.sin(this.angle * Math.PI / 180) * this.length;
    }

    getY(): number {
        return this.parent.getY() + Math.cos(this.angle * Math.PI / 180) * this.length;
    }

    setAngle(angle: number) {
        angle = angle % 360;
        this.angle = angle;
    }

    adjustAngle(angleChange: number) {
        this.setAngle(this.angle + angleChange);
        this.children.forEach(element => {
            element.adjustAngle(angleChange);
        });
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
        this.children.filter(item => item !== child);
    }
}