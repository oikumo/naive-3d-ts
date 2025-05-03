import { ApplicationContext } from "../base/application/application-context";
import { GameBase } from "../base/game/game-base";
import { SceneBase } from "../base/scene/scene-base";
import { SceneTest } from "./scenes/scene-test";
import { SceneTestLines } from "./scenes/scene-test-lines";
import { UserInputLogger } from "./user/user-input";

export class Game implements GameBase {
    #currentScene: SceneBase;
    #sceneTestLines: SceneTestLines;
    #sceneTest: SceneTest;

    constructor() {
        this.#sceneTest = new SceneTest();
        this.#sceneTestLines = new SceneTestLines();
    
        this.#currentScene = this.#sceneTest;
    }

    setup(context: ApplicationContext) {
        context.screen.setMouseObserver(new UserInputLogger(this));
    }

    start(context: ApplicationContext) {
        this.#currentScene.start(context);
    }

    update(deltaTime: number) {
        this.#currentScene.update(deltaTime);
    }

    render(context: ApplicationContext) {
        this.#currentScene.render(context);
    }

    switchScenes() {
        if (this.#currentScene === this.#sceneTest) {
            this.#currentScene = this.#sceneTestLines;
        } else {
            this.#currentScene = this.#sceneTest;
        }
    }
}