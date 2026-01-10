import { SidebarItemClass } from "./sidebar-item-class";

export class SidebarItem {
    text: string;
    onclick: () => void | null;
    styleClass: SidebarItemClass;

    private constructor(text: string, styleClass: SidebarItemClass, onclick: () => void | null) {
        this.text = text;
        this.styleClass = styleClass;
        this.onclick = onclick;
    }

    static create(text: string, styleClass: SidebarItemClass, onclick: () => void | null) {
        return new SidebarItem(text, styleClass, onclick);
    }
}
