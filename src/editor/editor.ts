import { Application } from "../base/application/application";
import { GameObject } from "../base/scene/gameobjects/game-object";
import { Player } from "../game/scenes/main-scene/player";
import { EditorUI } from "./editor-ui";
import { EmptyObject } from "../base/scene/gameobjects/empty-object";
import { SpriteObject } from "../base/scene/gameobjects/sprite-object";

export type EditorTool = 'move' | 'rotate' | 'scale';

export class Editor {

    static instance: Editor;
    #editorUi: EditorUI;
    private application: Application;
    #selectedGameObject: GameObject | null = null;
    #currentTool: EditorTool = 'move';
    #isDragging: boolean = false;
    #dragOffset: { x: number, y: number } = { x: 0, y: 0 };

    constructor(application: Application) {
        this.application = application;
        this.#editorUi = new EditorUI(this);
        Editor.instance = this;
    }

    show() {
        this.#editorUi.show();
    }

    get currentTool() {
        return this.#currentTool;
    }

    set currentTool(tool: EditorTool) {
        this.#currentTool = tool;
        this.#editorUi.updateToolbar();
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

    addGameObject(type: string = 'player') {
        let go: GameObject;
        const name = `${type.charAt(0).toUpperCase() + type.slice(1)} ${this.getHierarchy().length + 1}`;

        switch (type) {
            case 'empty': go = new EmptyObject(name); break;
            case 'sprite': go = new SpriteObject(name); break;
            case 'player':
            default: go = new Player(name); break;
        }

        go.transform.position.x = Math.floor(50 + (Math.random() * (200)));
        go.transform.position.y = Math.floor(50 + (Math.random() * (200)));
        this.application.game.getScene()!.hierarchy.addGameObject(go);

        this.#editorUi.updatePanelHierarchy();
        this.selectGameObject(go.id);
    }

    handleMouseDown(x: number, y: number) {
        // Hit-test: Check if we clicked on any object (simple distance check for 2D)
        const hit = this.getHierarchy().find(go => {
            const dist = Math.sqrt(Math.pow(go.transform.position.x - x, 2) + Math.pow(go.transform.position.y - y, 2));
            return dist < 50; // Selection radius
        });

        if (hit) {
            this.selectGameObject(hit.id);
            if (this.#currentTool === 'move') {
                this.#isDragging = true;
                this.#dragOffset = {
                    x: hit.transform.position.x - x,
                    y: hit.transform.position.y - y
                };
            }
        } else {
            this.selectGameObject(null);
        }
    }

    handleMouseMove(x: number, y: number) {
        if (this.#isDragging && this.#selectedGameObject && this.#currentTool === 'move') {
            this.#selectedGameObject.transform.position.x = x + this.#dragOffset.x;
            this.#selectedGameObject.transform.position.y = y + this.#dragOffset.y;
            this.#editorUi.updateInspector();
        }
    }

    handleMouseUp() {
        this.#isDragging = false;
    }

    duplicateSelectedGameObject() {
        if (!this.#selectedGameObject) return;

        const original = this.#selectedGameObject;
        // Simple duplication for now, could be more robust
        const clone = new Player(`${original.name} (Copy)`);
        clone.transform.position.x = original.transform.position.x + 20;
        clone.transform.position.y = original.transform.position.y + 20;
        clone.transform.rotation = original.transform.rotation;
        clone.transform.scale.x = original.transform.scale.x;
        clone.transform.scale.y = original.transform.scale.y;

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