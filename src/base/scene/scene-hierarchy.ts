import { GameObject } from './gameobjects/game-object';


export class SceneHierarchy {

    #gameObjects = new Array<GameObject>();

    get gameObjects() { return this.#gameObjects; }

    addGameObject(gameObject: GameObject) {
        this.#gameObjects.push(gameObject);
    }

    serialize() {
        for (let i = 0; i < this.#gameObjects.length; i++) {
            this.#gameObjects[i].constructor.name;
        }
    }
}
