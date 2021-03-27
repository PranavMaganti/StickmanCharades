import { List } from "./List";
import { Sprite } from "./Sprite";
export { Stage }

class Stage {
    private members: List<Sprite>;

    constructor() {
        this.members = new List<Sprite>();
    }

    addSprite(sprite: Sprite) {
        this.members.add(sprite);
    }
}