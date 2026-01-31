import { initialization } from './base/initialization.ts';
import { Editor } from './editor/editor.ts';
import { Game } from './game/game.ts';

class Main {
    #game: Game;

    constructor(game: Game) {
        this.#game = game;
    }

    async init() {
        const application = await initialization(this.#game);
        application.run();
        return application;
    }
}

(async () => {
    try {
        const main = new Main(new Game());
        const application = await main.init();
        const editor = new Editor(application);
        
        // Pass editor to the scene for mouse interactions
        const scene = application.game.getScene();
        if (scene && 'setEditor' in scene) {
            (scene as any).setEditor(editor);
        }
        
        editor.show();
    } catch (e: any) {
        console.error(e);
        document.body.innerHTML = `<div style="color: red; padding: 20px; font-family: monospace; white-space: pre-wrap; background: #333;">
            <h2>Error Initializing Game</h2>
            ${e.message}\n${e.stack}
        </div>`;
    }
})();




