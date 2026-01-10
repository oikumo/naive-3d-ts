import { Editor } from "./editor";

export class EditorUI {

    #editor: Editor;

    constructor(editor: Editor) {
        this.#editor = editor;

        const addBtn = document.getElementById('editor-btn-add');
        addBtn!.onclick = this.addGameObject.bind(this);
    }

    show() {
        this.updateHeader();
    }

    updateHeader() {
        const sceneName = document.getElementById('editor-scene-name');
        sceneName!.innerHTML = `${this.#editor.getSceneName()} (${this.#editor.getHierarchy().length})`;
    }

    addGameObject() {
        this.#editor.addGameObject();
    }

    updatePanelHierarchy() {
        const list = document.getElementById('editor-list-game-objects');
        list!.innerHTML = '';

        const selectedGo = this.#editor.selectedGameObject;

        this.#editor.getHierarchy().forEach(go => {
            const element = document.createElement('div');
            element.className = 'hierarchy-item' + (selectedGo?.id === go.id ? ' selected' : '');
            element.innerText = go.name || go.id;
            element.onclick = () => this.#editor.selectGameObject(go.id);
            list?.appendChild(element);
        });

        this.updateHeader();
    }

    updateInspector() {
        const inspectorContent = document.getElementById('editor-inspector-content');
        const selectedGo = this.#editor.selectedGameObject;

        if (!selectedGo) {
            inspectorContent!.innerHTML = `
                <div style="color: #666; font-style: italic; text-align: center; margin-top: 20px;">
                    Select an object to see its properties
                </div>`;
            return;
        }

        inspectorContent!.innerHTML = `
            <div class="inspector-group">
                <div class="panel-header" style="background: none; padding-left: 0; margin-bottom: 10px;">Transform</div>
                <div class="inspector-row">
                    <span class="inspector-label">Pos X</span>
                    <input type="number" id="inp-pos-x" class="inspector-input" value="${selectedGo.transform.position.x}">
                </div>
                <div class="inspector-row">
                    <span class="inspector-label">Pos Y</span>
                    <input type="number" id="inp-pos-y" class="inspector-input" value="${selectedGo.transform.position.y}">
                </div>
            </div>
            <div class="inspector-group">
                 <div class="panel-header" style="background: none; padding-left: 0; margin-bottom: 10px;">Actions</div>
                 <button id="btn-delete-go" class="minimal-btn" style="background-color: #d32f2f; width: 100%;">Delete</button>
            </div>
        `;

        const inpX = document.getElementById('inp-pos-x') as HTMLInputElement;
        const inpY = document.getElementById('inp-pos-y') as HTMLInputElement;

        inpX.oninput = (e) => {
            selectedGo.transform.position.x = parseFloat((e.target as HTMLInputElement).value) || 0;
        };
        inpY.oninput = (e) => {
            selectedGo.transform.position.y = parseFloat((e.target as HTMLInputElement).value) || 0;
        };

        const deleteBtn = document.getElementById('btn-delete-go');
        deleteBtn!.onclick = () => {
            // To be implemented in editor.ts
            (this.#editor as any).deleteSelectedGameObject();
        };
    }
}