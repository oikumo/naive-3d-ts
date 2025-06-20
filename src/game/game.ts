import { ApplicationContext } from "../base/application/application-context";
import { GameBase } from "../base/game/game-base";
import { SceneBase } from "../base/scene/scene-base";
import { MainScene } from "./scenes/main-scene/main-scene";

export class Game extends GameBase {
    #currentScene: SceneBase;
    
    constructor() {
        super();
        this.#currentScene = new MainScene();
    }

    override setup(context: ApplicationContext) {
        this.#currentScene.setup(context);
    }

    override start(context: ApplicationContext) {
        this.#currentScene.start(context);
    }

    override update(context: ApplicationContext, deltaTime: number) {
        this.#currentScene.update(context, deltaTime);
    }

    override render(context: ApplicationContext) {
        this.#currentScene.render(context);
    }
}