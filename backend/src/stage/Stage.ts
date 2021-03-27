import { Sprite } from "./Sprite";
import { SpriteNode } from "./SpriteNode";
export { Stage }

class Stage {
    private members: Sprite[];

    constructor() {
        this.members = [];
    }

    addSprite(sprite: Sprite) {
        this.members.push(sprite);
    }

    generateStickman(x: number, y: number): Sprite {
        let root = new Sprite(x, y);

        let chest = root.addChild(0,1);
        let neck = chest.addChild(0, 1);
        let head = neck.addChild(0, 1);

        let elbowL = neck.addChild(225, 1);
        let elbowR = neck.addChild(135, 1);

        let handL = elbowL.addChild(145, 1);
        let handR = elbowR.addChild(215, 1);

        let kneeL = root.addChild(200, 1);
        let kneeR = root.addChild(160, 1);

        let footL = kneeL.addChild(200, 1);
        let footR = kneeR.addChild(160, 1);

        return root;
    }
    
}

