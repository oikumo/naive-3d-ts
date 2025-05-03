import { Scene } from '../scene/scene';
import { Blas } from '../core/blas/blas';
import { HtmlScreen } from '../screen/screen';

export class Main {
  private screen: HtmlScreen;
  private scene: Scene;
  #time: number = 0;
  #deltaTime: number = 0;

  constructor(screen: HtmlScreen, blas: Blas) {
    this.screen = screen;
    this.scene = new Scene(screen, blas);
  }

  run() {
    this.scene.start();
    let now = Date.now();
    this.#time = now; 
    this.#deltaTime = 0;

    setInterval(() => {
      this.screen.clear();
      this.scene.update(this.#deltaTime);
      this.scene.render();
      this.screen.update();
      
      now = Date.now();
      this.#deltaTime = now - this.#time;
      this.#time = now;

    }, 10);
  }
}
