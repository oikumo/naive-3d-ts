import { Information } from "../controllers/dasboard-controller";
import { ModelTestResult } from "../model/test-result";
import { createSidebar } from "./sidebar";
import { TestCard, TestCardConfig } from "./test-card";
import { createTestContainer } from "./test-card-container";


export class Dashboard {
    #information: Information;
    #document: Document;
    #rootElement: HTMLElement;
    #header: HTMLDivElement | null;
    #dashboardGrid: HTMLDivElement | null;
    #sidebar: HTMLDivElement | null;
    #testContainer: HTMLDivElement | null;
 
    constructor(rootElementName: string = 'app', information: Information){
        const doc = document;
        if (doc === null) throw new Error();
        const root = doc.getElementById(rootElementName);
        if (root === null) throw new Error();

        this.#document = doc;
        this.#rootElement = root;
        this.#information = information;

        this.create();
    }

    create() {
        this.#header = this.createHeader();
        this.#dashboardGrid = this.createGrid();
        this.#sidebar = createSidebar();
        this.#testContainer = createTestContainer();

        this.#dashboardGrid.appendChild(this.#sidebar);
        this.#dashboardGrid.appendChild(this.#testContainer);

        
        this.#rootElement.append(
            this.#header,
            this.#dashboardGrid
        );

                document.querySelectorAll('.test-card').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('expanded');
            });
        });

    }

    setResult(results: Array<ModelTestResult>) {
        const items = new Array<HTMLDivElement>();

        for (let i  = 0; i < results.length; i++) {
            const config: TestCardConfig = {
                status: 'success',
                title: results[i].description,
                duration: '1.2s',
                environment: 'Chrome 104',
                progressWidth: '100%',
                details: `✓ Successfully logged in with valid credentials
                ✓ Invalid credentials rejected
                ✓ Session persistence verified`
            };
            items.push(this.createTestItem(i.toString(), config));
        }

        this.#testContainer?.replaceChildren(...items);
    }

    createHeader() {
        const element = this.#document.createElement("div");
        element.className = "dashboard-header";
        element.innerHTML = `<h1>${this.#information.title}</h1><p>Version ${this.#information.version}</p></div>`;
        return element;
    }


    createGrid() {
        const dashboardGrid = this.#document.createElement("div");
        dashboardGrid.className = 'dashboard-grid';

        return dashboardGrid;
    }
    
    createTestItem(id: string, config: TestCardConfig) {
        const testCard = new TestCard('card-' + id, config);

        return testCard.create();
    }
}


