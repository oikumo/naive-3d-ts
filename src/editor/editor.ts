import { Application } from "../base/application/application";
import { GameObject } from "../base/scene/gameobjects/game-object";
import { Player } from "../game/scenes/main-scene/player";
import { EditorUI } from "./editor-ui";

export class Editor {

    #editorUi: EditorUI;
    private application: Application;
    #selectedGameObject: GameObject | null = null;

    constructor(application: Application) {
        this.application = application;
        this.#editorUi = new EditorUI(this);
    }

    show() {
        this.#editorUi.show();
    }

    getSceneName() {
        return this.application.game.getScene()?.getName() || "No Scene";
    }

    get selectedGameObject() {
        return this.#selectedGameObject;
    }

    selectGameObject(id: string | null) {
        if (id === null) {
            this.#selectedGameObject = null;
        } else {
            const go = this.getHierarchy().find(g => g.id === id);
            this.#selectedGameObject = go || null;
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

    duplicateSelectedGameObject() {
        if (!this.#selectedGameObject) return;

        const original = this.#selectedGameObject;
        // Simple duplication for now, could be more robust
        const clone = new Player(`${original.name} (Copy)`);
        clone.transform.position.x = original.transform.position.x + 20;
        clone.transform.position.y = original.transform.position.y + 20;

        this.application.game.getScene()!.hierarchy.addGameObject(clone);
        this.#editorUi.updatePanelHierarchy();
        this.selectGameObject(clone.id);
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