import { DOM } from "../../../../app/html/dom";
import { Sidebar } from "./widgets/sidebar/sidebar";
import { SidebarItem } from "./widgets/sidebar/sidebar-item";

export class PAGE {

    static #SIDEBAR_ID = 'sidebar-id'; 
    static #LAYOUT_GRID_ID = 'dashboard-grid-id';

    private constructor(){
    }

    static init() {
        PAGE.clean();
        DOM.setGlobalStyle();
    }

    static clean() {
        DOM.clean();
    }

    static setHeader(title: string, subtitle: string) {
        DOM.setHeader(title, subtitle);
    }

    static setLayout(sidebarItems: Array<SidebarItem>, content: HTMLElement | null = null) {
        DOM.cleanById(this.#LAYOUT_GRID_ID);
        
        const element = DOM.createDivWithId(this.#LAYOUT_GRID_ID, 'dashboard-grid');
        
        const sidebar = Sidebar.create(sidebarItems);
        sidebar.id = this.#SIDEBAR_ID;

        element.appendChild(sidebar);

        if (content !== null) {
            element.appendChild(content);
        }

        DOM.getRoot().appendChild(element);
    }
}