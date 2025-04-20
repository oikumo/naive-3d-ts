import * as wasmBlas from 'naive-blas-wasm';
import { Color } from '../common/colors';
import { Texture } from '../core/textures/texture';
import { Vector2 } from '../core/vector/vector2';
import { IScreen } from '../screen/screen';

export class Main {
  private screen: IScreen;
  private tex: Texture;
  private texCenter: Vector2;

  constructor(screen: IScreen) {
    this.screen = screen;
    this.tex = new Texture(320, 320);
    this.texCenter = { x: this.tex.width / 2, y: this.tex.height / 2 };
    this.tex.fill(() => Color.blue);
    this.init();
  }

  run() {
    setInterval(() => {
      this.screen.clear(Color.black);
      this.screen.paint(this.tex, this.texCenter);
      this.screen.update();
    }, 10);
  }

  private init() {
    this.loadWasm();
  }

  private async loadWasm() {
    const blas = await wasmBlas.default();
    console.log(blas.int_sqrt(9));
  }
}
