import { ApplicationContext } from '../../base/application/application-context';

export interface SceneBase {

    start(context: ApplicationContext) : void;

    update(deltaTime: number) : void;

    render(context: ApplicationContext) : void;
}