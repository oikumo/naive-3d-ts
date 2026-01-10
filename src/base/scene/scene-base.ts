import { ApplicationContext } from '../../base/application/application-context';
import { SceneHierarchy } from './scene-hierarchy';

export abstract class SceneBase {

    static instance: SceneBase;

    protected name: string;

    constructor(name: string) {
        SceneBase.instance = this;
        this.name = name;
    }

    #hierarchy = new SceneHierarchy();

    getName() { return this.name; }

    get hierarchy() { return this.#hierarchy; }

    abstract setup(context: ApplicationContext) : void;

    abstract start(context: ApplicationContext) : void;

    abstract update(context: ApplicationContext, deltaTime: number) : void;

    abstract render(context: ApplicationContext) : void;
}

