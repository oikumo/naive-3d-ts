import { PAGE } from "../../page/page";
import { SidebarItem } from "../../page/widgets/sidebar/sidebar-item";
import { SidebarItemClass } from "../../page/widgets/sidebar/sidebar-item-class";

export interface IInteractiveViewPartner {
    
    backToMain(): void;
}

export class InteractiveView {
    #controller: IInteractiveViewPartner;

    constructor(controller: IInteractiveViewPartner) {
        this.#controller = controller;
    }

    show() {
        PAGE.init();
        PAGE.setHeader('Interactive', 'Canvas');
        PAGE.setLayout(this.#createSidebarItems());
    }

    close() {

    }

    #createSidebarItems() {
        return [
            SidebarItem.create('Back', SidebarItemClass.PLAY, 
                () => this.#controller.backToMain()),

        ]
    }
}