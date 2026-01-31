import { GameBase } from '../game/game-base';
import { ScreenHtml } from '../screen/screen-html';
import { ApplicationContext } from './application-context';

export class Application {
  #screen: ScreenHtml;
  #game: GameBase;
  #context: ApplicationContext;
  #deltaTime: number = 0;

  get game() { return this.#game; }

  constructor(game: GameBase, context: ApplicationContext) {
    this.#context = context;
    this.#screen = context.screen;
    this.#game = game;
  }

  run() {
    this.#game.setup(this.#context);
    this.#game.start(this.#context);
    let lastTime = performance.now() / 1000;
    this.#deltaTime = 0;

    const loop = (nowTime: number) => {
      const now = nowTime / 1000;
      this.#deltaTime = now - lastTime;
      lastTime = now;

      this.#game.update(this.#context, this.#deltaTime);
      this.#game.render(this.#context);
      this.#screen.update();

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }
}
