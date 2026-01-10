import { Application } from "../base/application/application";
import { Player } from "../game/scenes/main-scene/player";
import { EditorUI } from "./editor-ui";

export class Editor {

    #editorUi: EditorUI;

    private application: Application;

    constructor(application: Application) {
        this.application = application;
        this.#editorUi = new EditorUI(this);
    }

    show() {
        this.#editorUi.show();
    }

    getSceneName() {
        return this.application.game.getScene()!.getName();
    }

    addGameObject() {
        for (let i = 0; i < 100; i++) {
            const go = new Player('player');
            go.transform.position.x = Math.floor(50 + (Math.random() * (200)));
            go.transform.position.y = Math.floor(50 + (Math.random() * (200)));
            this.application.game.getScene()!.hierarchy.addGameObject(go);
        }

        this.#editorUi.updatePanelHierarchy();
    }

    getHierarchy() {
        return this.application.game.getScene()!.hierarchy.gameObjects;
    }
}