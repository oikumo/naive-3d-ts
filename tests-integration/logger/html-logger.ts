export class HtmlLogger {
    #document: Document;
    #rootElement: HTMLElement; 

    constructor(rootElementName: string = 'app'){
        const doc = document;
        if (doc === null) throw new Error();
        const root = doc.getElementById(rootElementName);
        if (root === null) throw new Error();

        this.#document = doc;
        this.#rootElement = root;
    }

    log(message: string) {
        this.createText(message);
    }

    success(message: string) {
        this.createParagraph(message);
    }

    createText(message: string) {
        const newDiv = this.#document.createElement("div");
        newDiv.appendChild(this.#document.createTextNode(message));
        this.#rootElement.appendChild(newDiv);
    }

    createParagraph(message: string) {
        const newDiv = this.#document.createElement("div")
        const p = this.#document.createElement("p");
        p.appendChild(this.#document.createTextNode(message));
        newDiv.appendChild(p);
        this.#rootElement.appendChild(newDiv);
    }
}