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

const main = new Main(new Game());
const application = await main.init();
const editor = new Editor(application);
editor.show();


  

