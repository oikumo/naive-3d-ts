import { ApplicationContext } from "../base/application/application-context";
import { GameBase } from "../base/game/game-base";
import { SimpleScene } from "./scenes/simple-scene/simple-scene";

export class Game extends GameBase {
    
    constructor() {
        super();
        this.scene = new SimpleScene();
    }

    override setup(context: ApplicationContext) {
        this.scene!.setup(context);
    }

    override start(context: ApplicationContext) {
        this.scene!.start(context);
    }

    override update(context: ApplicationContext, deltaTime: number) {
        this.scene!.update(context, deltaTime);
    }

    override render(context: ApplicationContext) {
        this.scene!.render(context);
    }
}