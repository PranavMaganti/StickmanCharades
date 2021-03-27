import { SpriteNode } from "./SpriteNode"
import { List } from "./List"
import { Point } from "./Point";

export { SpriteRoot }

class SpriteRoot implements SpriteNode {
    private children: List<SpriteNode>;

    private rootX: number;
    private rootY: number;

    constructor(rootX: number, rootY: number, children: List<SpriteNode>) {
        this.rootX = rootX;
        this.rootY = rootY;
        this.children = children;
    }

    getX(): number {
        return this.rootX;
    }

    getY(): number {
        return this.rootY;
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