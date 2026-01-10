import { Editor, EditorTool } from "./editor";

export class EditorUI {

    #editor: Editor;

    constructor(editor: Editor) {
        this.#editor = editor;

        this.initCreateMenu();
        this.initToolbar();
    }

    initCreateMenu() {
        const createBtn = document.getElementById('editor-btn-create');
        const createMenu = document.getElementById('create-menu');

        if (!createBtn || !createMenu) {
            console.warn('Editor UI: Create menu elements not found. Check index.html');
            return;
        }

        createBtn.onclick = (e) => {
            e.stopPropagation();
            createMenu.classList.toggle('show');
        };

        window.onclick = () => {
            createMenu.classList.remove('show');
        };

        const menuItems = createMenu.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            (item as HTMLButtonElement).onclick = () => {
                const type = (item as HTMLButtonElement).dataset.type || 'player';
                this.#editor.addGameObject(type);
                createMenu.classList.remove('show');
            };
        });
    }

    initToolbar() {
        ['move', 'rotate', 'scale'].forEach(tool => {
            const btn = document.getElementById(`tool-${tool}`);
            if (btn) {
                btn.onclick = () => {
                    this.#editor.currentTool = tool as EditorTool;
                };
            }
        });

        // Add keyboard shortcuts
        window.addEventListener('keydown', (e) => {
            if (e.target instanceof HTMLInputElement) return;

            if (e.key.toLowerCase() === 'w') this.#editor.currentTool = 'move';
            if (e.key.toLowerCase() === 'e') this.#editor.currentTool = 'rotate';
            if (e.key.toLowerCase() === 'r') this.#editor.currentTool = 'scale';
        });
    }

    updateToolbar() {
        ['move', 'rotate', 'scale'].forEach(tool => {
            const btn = document.getElementById(`tool-${tool}`);
            if (btn) {
                if (this.#editor.currentTool === tool) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            }
        });
    }

    show() {
        this.updateHeader();
        this.updateToolbar();
    }

    updateHeader() {
        const sceneName = document.getElementById('editor-scene-name');
        if (sceneName) {
            sceneName.innerHTML = `${this.#editor.getSceneName()} (${this.#editor.getHierarchy().length})`;
        }
    }

    addGameObject() {
        this.#editor.addGameObject();
    }

    updatePanelHierarchy() {
        const list = document.getElementById('editor-list-game-objects');
        if (!list) return;
        list.innerHTML = '';

        const selectedGo = this.#editor.selectedGameObject;

        this.#editor.getHierarchy().forEach(go => {
            const element = document.createElement('div');
            element.className = 'hierarchy-item' + (selectedGo?.id === go.id ? ' selected' : '');

            let icon = '󰆾'; // Default
            if (go.constructor.name.includes('Player')) icon = '󰙊';
            if (go.constructor.name.includes('Sprite')) icon = '󰋩';
            if (go.constructor.name.includes('Empty')) icon = '󰆧';

            element.innerHTML = `<span style="margin-right: 8px; opacity: 0.6;">${icon}</span>${go.name || go.id}`;
            element.onclick = () => this.#editor.selectGameObject(go.id);
            list?.appendChild(element);
        });

        this.updateHeader();
    }

    updateInspector() {
        const inspectorContent = document.getElementById('editor-inspector-content');
        if (!inspectorContent) return;

        const selectedGo = this.#editor.selectedGameObject;

        if (!selectedGo) {
            inspectorContent!.innerHTML = `
                <div class="inspector-empty-state">
                    Select an object to see its properties
                </div>`;
            return;
        }

        inspectorContent!.innerHTML = `
            <div class="inspector-group">
                <div class="inspector-group-header">Identity</div>
                <div class="inspector-row">
                    <span class="inspector-label">Name</span>
                    <input type="text" id="inp-go-name" class="inspector-input" value="${selectedGo.name}">
                </div>
            </div>

            <div class="inspector-group">
                <div class="inspector-group-header">Transform</div>
                
                <div class="inspector-label">Position</div>
                <div class="inspector-row-multi">
                    <div class="inspector-field">
                        <span class="field-label">X</span>
                        <input type="number" id="inp-pos-x" class="inspector-input" value="${selectedGo.transform.position.x}">
                    </div>
                    <div class="inspector-field">
                        <span class="field-label">Y</span>
                        <input type="number" id="inp-pos-y" class="inspector-input" value="${selectedGo.transform.position.y}">
                    </div>
                </div>

                <div class="inspector-label">Rotation</div>
                <div class="inspector-row">
                    <input type="number" id="inp-rot" class="inspector-input" value="${selectedGo.transform.rotation}">
                </div>

                <div class="inspector-label" style="margin-top: 4px;">Scale</div>
                <div class="inspector-row-multi">
                    <div class="inspector-field">
                        <span class="field-label">X</span>
                        <input type="number" id="inp-scale-x" class="inspector-input" value="${selectedGo.transform.scale.x}">
                    </div>
                    <div class="inspector-field">
                        <span class="field-label">Y</span>
                        <input type="number" id="inp-scale-y" class="inspector-input" value="${selectedGo.transform.scale.y}">
                    </div>
                </div>
            </div>

            <div class="inspector-group">
                 <div class="inspector-group-header">Actions</div>
                 <div style="display: flex; gap: 8px;">
                    <button id="btn-duplicate-go" class="minimal-btn" style="flex: 1;">Duplicate</button>
                    <button id="btn-delete-go" class="minimal-btn danger" style="flex: 1;">Delete</button>
                 </div>
            </div>
        `;

        const getInp = (id: string) => document.getElementById(id) as HTMLInputElement;

        getInp('inp-go-name').oninput = (e) => {
            selectedGo.name = (e.target as HTMLInputElement).value;
            this.updatePanelHierarchy();
        };

        getInp('inp-pos-x').oninput = (e) => {
            selectedGo.transform.position.x = parseFloat((e.target as HTMLInputElement).value) || 0;
        };
        getInp('inp-pos-y').oninput = (e) => {
            selectedGo.transform.position.y = parseFloat((e.target as HTMLInputElement).value) || 0;
        };
        getInp('inp-rot').oninput = (e) => {
            selectedGo.transform.rotation = parseFloat((e.target as HTMLInputElement).value) || 0;
        };
        getInp('inp-scale-x').oninput = (e) => {
            selectedGo.transform.scale.x = parseFloat((e.target as HTMLInputElement).value) || 0;
        };
        getInp('inp-scale-y').oninput = (e) => {
            selectedGo.transform.scale.y = parseFloat((e.target as HTMLInputElement).value) || 0;
        };

        const duplicateBtn = document.getElementById('btn-duplicate-go');
        duplicateBtn!.onclick = () => {
            this.#editor.duplicateSelectedGameObject();
        };

        const deleteBtn = document.getElementById('btn-delete-go');
        deleteBtn!.onclick = () => {
            this.#editor.deleteSelectedGameObject();
        };
    }
}