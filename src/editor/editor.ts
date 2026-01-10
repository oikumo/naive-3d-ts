import { Application } from "../base/application/application";
import { Player } from "../game/scenes/main-scene/player";
import { EditorUI } from "./editor-ui";

export class Editor {

    #editorUi: EditorUI;
    private application: Application;
    #selectedGameObject: Player | null = null;

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

    get selectedGameObject() {
        return this.#selectedGameObject;
    }

    selectGameObject(id: string | null) {
        if (id === null) {
            this.#selectedGameObject = null;
        } else {
            const go = this.getHierarchy().find(g => g.id === id);
            this.#selectedGameObject = go as Player || null;
        }
        this.#editorUi.updatePanelHierarchy();
        this.#editorUi.updateInspector();
    }

    addGameObject() {
        const go = new Player('Player ' + (this.getHierarchy().length + 1));
        go.transform.position.x = Math.floor(50 + (Math.random() * (200)));
        go.transform.position.y = Math.floor(50 + (Math.random() * (200)));
        this.application.game.getScene()!.hierarchy.addGameObject(go);

        this.#editorUi.updatePanelHierarchy();
    }

    getHierarchy() {
        return this.application.game.getScene()!.hierarchy.gameObjects;
    }

    deleteSelectedGameObject() {
        if (!this.#selectedGameObject) return;

        this.application.game.getScene()!.hierarchy.removeGameObject(this.#selectedGameObject.id);
        this.#selectedGameObject = null;
        this.#editorUi.updatePanelHierarchy();
        this.#editorUi.updateInspector();
    }
}