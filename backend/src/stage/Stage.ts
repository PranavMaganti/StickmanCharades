import { List } from "./List";
import { SpriteRoot } from "./SpriteRoot";
export { Stage }

class Stage {
    private members: List<SpriteRoot>;

    constructor() {
        this.members = new List<SpriteRoot>();
    }

    addSprite(sprite: SpriteRoot) {
        this.members.add(sprite);
    }
}