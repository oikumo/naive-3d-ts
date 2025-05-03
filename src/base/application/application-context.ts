import { Blas } from '../../core/blas/blas';
import { ScreenHtml } from '../screen/screen-html';

export class ApplicationContext {

  #blas: Blas;
  #screen: ScreenHtml;

  get blas() { return this.#blas; }
  get screen() { return this.#screen; }

  constructor(blas: Blas, screen: ScreenHtml) {
    this.#blas = blas;
    this.#screen = screen;
  }
}
