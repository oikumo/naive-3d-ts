
import { GlobalStyle } from "../../../../../html/style";
import { DOM } from "../../../../../html/dom";
import { SidebarItem } from "./sidebar-item";

export class Sidebar {

    static create(items: Array<SidebarItem>) {
        const sidebar = DOM.createDiv('sidebar');
        const navList = DOM.createNavList('nav-list');
        sidebar.appendChild(navList);

        const navItems = new Array<HTMLLIElement>();

        items.forEach(item => {
            const navItem = DOM.createNavItem(GlobalStyle.CLASS_ID.NavItem);
            navItem.innerHTML = item.styleClass + item.text; 
            navItem.onclick = item.onclick;
            navItems.push(navItem);    
        });

        navItems.forEach(navItem => {
            navList.appendChild(navItem);
        });

        return sidebar;
    }
}
