import { Editor } from "./editor";

export class EditorUI {

    #editor: Editor;

    constructor(editor: Editor) {
        this.#editor = editor;

        const start = document.getElementById('editor-btn-start');
        start!.onclick = this.addGameObject.bind(this);
    }

    show() {
        const sceneName = document.getElementById('editor-scene-name');
        sceneName!.innerHTML = this.#editor.getSceneName();
    }

    addGameObject() {
        this.#editor.addGameObject();
    }

    updatePanelHierarchy() {
        const list = document.getElementById('editor-list-game-objects');
        list!.innerHTML = '';

        this.#editor.getHierarchy().forEach(go => {
            const element = document.createElement('div');
            element.innerHTML = `<p>${go.id}</p>`;
            list?.appendChild(element);
        });

        const sceneName = document.getElementById('editor-scene-name');
        sceneName!.innerHTML = this.#editor.getSceneName() + ' #go: ' + this.#editor.getHierarchy().length;
    }
}