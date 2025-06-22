import { ApplicationContext } from '../../base/application/application-context';
import { SceneHierarchy } from './scene-hierarchy';

export abstract class SceneBase {

    static instance: SceneBase;

    constructor() {
        SceneBase.instance = this;
    }

    #hierarchy = new SceneHierarchy();

    get hierarchy() { return this.#hierarchy; }

    abstract setup(context: ApplicationContext) : void;

    abstract start(context: ApplicationContext) : void;

    abstract update(context: ApplicationContext, deltaTime: number) : void;

    abstract render(context: ApplicationContext) : void;
}

