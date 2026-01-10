import { GlobalStyle } from "./style";

export class DOM {

    static getRoot(rootElementId: string | null = null) {
        const doc = document;
        if (doc === null) throw new Error();

        let root: HTMLElement | null = null;
        if (rootElementId !== null) {
            root = doc.getElementById(rootElementId);
        } else {
            root = doc.body;
        }
        if (root === null) throw new Error();

        return root;
    }

    static clean() {
        this.getRoot().innerHTML = '';
    }

    static cleanById(id: string) {
        const found = document.getElementById(id);
        if (found) {
            document.body.removeChild(found);
        }   
    }

    static getElementById(id: string) {
        return document.getElementById(id);
    }

    static readonly #HEADER_ID = 'header-id';

    static setHeader(title: string, subtitle: string = "") {
        this.cleanById(this.#HEADER_ID);

        const element = DOM.createDivWithId(this.#HEADER_ID, "dashboard-header");
        element.innerHTML = `<h1>${title}</h1><p>${subtitle}</p></div>`;
        
        this.getRoot().appendChild(element);
    }

    static createHeader(title: string, subtitle: string = "") {
        const element = DOM.createDiv("dashboard-header");
        element.innerHTML = `<h1>${title}</h1><p>${subtitle}</p></div>`;
        return element;
    }

    static setGlobalStyle() {
        const customStyle = new GlobalStyle({
            colors: {
                background: "#1a1a2e",
                surface: "#16213e",
            },
            spacing: {
                bodyPadding: "1.5rem",
            },
            typography: {
                fontFamily: "'Roboto', sans-serif",
            }
        });
        customStyle.apply();
    }

    static createElement(tagName: string, className?: string): HTMLElement {
        const element = document.createElement(tagName);
        if (className) {
            element.className = className;
        }
        return element;
    }

    static createDivWithId(id: string, className?: string): HTMLDivElement {
        const element = this.createElement('div', className) as HTMLDivElement;
        element.id = id;
        return element;
    }


    static createDiv(className?: string): HTMLDivElement {
        return this.createElement('div', className) as HTMLDivElement;
    }

    static createSpan(className?: string): HTMLSpanElement {
        return this.createElement('span', className) as HTMLSpanElement;
    }

    static createButton(className?: string): HTMLButtonElement {
        return this.createElement('button', className) as HTMLButtonElement;
    }

    static createNavList(className?: string): HTMLUListElement {
        const ul = document.createElement('ul');
        if (className) {
            ul.className = className;
        }
        return ul;
    }

    static createNavItem(className?: string): HTMLLIElement {
        const li = document.createElement('li');
        if (className) {
            li.className = className;
        }
        return li;
    }
}
