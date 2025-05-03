import { initialization } from './base/initialization.ts';
import { Game } from './game/game.ts';

async function init(game: Game) {
    const application = await initialization(game);
    application.run();
}

await init(new Game());


  

