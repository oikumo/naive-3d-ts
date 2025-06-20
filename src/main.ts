import { initialization } from './base/initialization.ts';
import { Game } from './game/game.ts';

class Main {
    #game: Game;

    constructor(game: Game) {
        this.#game = game;
    }

    async init() {
        const application = await initialization(this.#game);
        application.run();
    }
}

const main = new Main(new Game());
await main.init();


  

