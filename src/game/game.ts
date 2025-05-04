import { ApplicationContext } from "../base/application/application-context";
import { GameBase } from "../base/game/game-base";
import { SceneBase } from "../base/scene/scene-base";
import { SceneEntities } from "./scenes/scene-entities/scene-entities";

export class Game implements GameBase {
    #currentScene: SceneBase;
    #sceneTestLines: SceneEntities;

    constructor() {
        this.#sceneTestLines = new SceneEntities();
        this.#currentScene = this.#sceneTestLines;
    }

    setup(_context: ApplicationContext) {
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