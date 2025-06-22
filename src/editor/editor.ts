import { Application } from "../base/application/application";
import { Player } from "../scripts/player";
import { EditorUI } from "./editor-ui";

export class Editor {

    #editorUi: EditorUI;

    private application: Application;

    constructor(application: Application) {
        this.application = application;
        this.#editorUi = new EditorUI(this);
    }

    addGameObject() {
        this.application.game.getScene()!.hierarchy.addGameObject(new Player('player'));
        this.#editorUi.updatePanelHierarchy();
    }

    getHierarchy() {
        return this.application.game.getScene()!.hierarchy.gameObjects;
    }
}