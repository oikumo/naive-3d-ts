import { ApplicationContext } from '../../base/application/application-context';

export interface SceneBase {

    setup(context: ApplicationContext) : void;

    start(context: ApplicationContext) : void;

    update(context: ApplicationContext, deltaTime: number) : void;

    render(context: ApplicationContext) : void;
}