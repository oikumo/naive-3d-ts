import { IScreen } from '../screen/screen';
import { Scene } from '../scene/scene';

export class Main {
  private screen: IScreen;
  private scene: Scene;
  #time: number = 0;
  #deltaTime: number = 0;

  constructor(screen: IScreen) {
    this.screen = screen;
    this.scene = new Scene(screen);
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
