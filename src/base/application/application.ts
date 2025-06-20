import { GameBase } from '../game/game-base';
import { ScreenHtml } from '../screen/screen-html';
import { ApplicationContext } from './application-context';

export class Application {
  #screen: ScreenHtml;
  #game: GameBase;
  #context: ApplicationContext;
  #time: number = 0;
  #deltaTime: number = 0;

  constructor(game: GameBase, context: ApplicationContext) {
    this.#context = context;
    this.#screen = context.screen;
    this.#game = game;
  }

  run() {
    this.#game.setup(this.#context);
    this.#game.start(this.#context);
    let now = Date.now() / 1000;
    this.#time = now; 
    this.#deltaTime = 0;

    setInterval(() => {
      //this.screen.clear();
      this.#game.update(this.#context, this.#deltaTime);
      this.#game.render(this.#context);
      this.#screen.update();
      
      now = Date.now() / 1000;
      this.#deltaTime = now - this.#time;
      this.#time = now;

    }, 1);
  }
}
