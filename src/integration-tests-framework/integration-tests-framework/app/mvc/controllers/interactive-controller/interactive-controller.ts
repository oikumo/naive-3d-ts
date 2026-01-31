import { IInteractiveViewPartner, InteractiveView } from "../../views/screens/interactive-view/interactive-view";
import { IController } from "../i-controller";
import { MainController } from "../main-controller/main-controller";

export class InteractiveController implements IController, IInteractiveViewPartner {
    #controllerPartner: MainController;
    #view: InteractiveView;

    constructor(controllerPartner: MainController) {
        this.#view = new InteractiveView(this);
        this.#controllerPartner = controllerPartner;
    }

    backToMain(): void {
        this.#controllerPartner.backToMain();
    }

    show(): void {
        this.#view.show();
    }

    close(): void {
        this.#view.close();
    }

    update() {
        
    }

}