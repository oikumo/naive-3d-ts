import { Blas } from '../../core/blas/blas';
import { EntityManager } from '../scene/entity-manager';
import { ScreenHtml } from '../screen/screen-html';

export class ApplicationContext {

  #blas: Blas;
  #screen: ScreenHtml;
  entityManager: EntityManager;

  get blas() { return this.#blas; }
  get screen() { return this.#screen; }
//  get entityManager () { return this.#entityManager; }

  constructor(blas: Blas, screen: ScreenHtml, entityManager: EntityManager) {
    this.#blas = blas;
    this.#screen = screen;
    this.entityManager = entityManager;
  }
}
