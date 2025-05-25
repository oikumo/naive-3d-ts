import { ApplicationContext } from "../base/application/application-context";
import { GameBase } from "../base/game/game-base";
import { SceneBase } from "../base/scene/scene-base";
import { MainScene } from "./scenes/main-scene/main-scene";

export class Game implements GameBase {
    #currentScene: SceneBase;
    
    constructor() {
        this.#currentScene = new MainScene();
    }

    setup(context: ApplicationContext) {
        this.#currentScene.setup(context);
    }

    start(context: ApplicationContext) {
        this.#currentScene.start(context);
    }

    update(context: ApplicationContext, deltaTime: number) {
        this.#currentScene.update(context, deltaTime);
    }

    render(context: ApplicationContext) {
        this.#currentScene.render(context);
    }
}