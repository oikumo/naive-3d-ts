import { IMainControllerPartner, Information } from "../../../controllers/main-controller/main-controller";
import { SidebarItem } from "../../page/widgets/sidebar/sidebar-item";
import { SidebarItemClass } from "../../page/widgets/sidebar/sidebar-item-class";
import { DOM } from "../../../../html/dom";
import { TestCardInfo } from "../../page/widgets/test-card/test-card-info";
import { TestCard } from "../../page/widgets/test-card/test-card";
import { PAGE } from "../../page/page";


export interface IMainViewPartner {
    
    runTestsAsync(): void;

    navigateTo(): void;
}

export class MainView implements IMainControllerPartner {
    #controller: IMainViewPartner;
    #information: Information;
 
    constructor(controller: IMainViewPartner, information: Information){
        this.#controller = controller;
        this.#information = information;
        this.create();
    }

    static #TESTS_ID = 'test-container-id';

    create() {
        PAGE.init();
        PAGE.setHeader(this.#information.title, this.#information.version);
        PAGE.setLayout(
            this.#createSidebarItems(),
            DOM.createDivWithId(MainView.#TESTS_ID, 'test-container')
        );
    }

    updateResults(results: Array<TestCardInfo>) {
        const items = new Array<HTMLDivElement>();

        for (let i  = 0; i < results.length; i++) {
            const testCard = new TestCard('card-' + i.toString(), results[i]);
            items.push(testCard.create());
        }

        const container = DOM.getElementById(MainView.#TESTS_ID);

        if (container) {
            container.replaceChildren(...items);
        
            document.querySelectorAll('.test-card').forEach(card => {
                card.addEventListener('click', () => {
                    card.classList.toggle('expanded');
                });
            });
        }
    }

    #createSidebarItems() {
        return [
            SidebarItem.create('Run All Tests', SidebarItemClass.PLAY, 
                () => this.#controller.runTestsAsync()),

            SidebarItem.create('Interactive', SidebarItemClass.FILTER, 
                () => this.#controller.navigateTo()), 
            
            SidebarItem.create('Clean', SidebarItemClass.ANALYTICS, 
                () => PAGE.init()),
            
            SidebarItem.create('Settings', SidebarItemClass.SETTINGS, 
                () => this.#controller.runTestsAsync())
        ]
    }
}


