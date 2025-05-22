import { createTestCard, TestCard } from "./widgets/test-card";
import { TestCardConfig } from "./widgets/test-card-config";
import { createTestContainer } from "./widgets/test-container";

export class Dashboard {
    #document: Document;
    #rootElement: HTMLElement; 

    constructor(rootElementName: string = 'app'){
        const doc = document;
        if (doc === null) throw new Error();
        const root = doc.getElementById(rootElementName);
        if (root === null) throw new Error();

        this.#document = doc;
        this.#rootElement = root;

        this.addHeader('Naive 3D TS Integration Tests', '0.0.1');
        this.addDashboardGrid();
    }

    addHeader(title: string, version: string) {
        const element = this.#document.createElement("div");
        element.className = "dashboard-header";
        element.innerHTML = `<h1>${title}</h1><p>Version ${version}</p></div>`;
        this.#rootElement.appendChild(element);
    }

    addDashboardGrid() {
        const dashboardGrid = this.#document.createElement("div");
        dashboardGrid.className = 'dashboard-grid';

        const sidebar = this.#document.createElement("div");
        sidebar.className = "sidebar";
        
        const navList = this.#document.createElement("ul");
        navList.className = "nav-list";

        const navItem = this.#document.createElement("li");
        navItem.className = 'nav-item';
        navItem.innerHTML = '<i class="fas fa-play"></i>Run All Tests';

        const navItem2 = this.#document.createElement("li");
        navItem2.className = 'nav-item';
        navItem2.innerHTML = '<i class="fas fa-filter"></i>Filter Results';


        const navItem3 = this.#document.createElement("li");
        navItem3.className = 'nav-item';
        navItem3.innerHTML = '<i class="fas fa-chart-line"></i>Analytics';



        const navItem4 = this.#document.createElement("li");
        navItem4.className = 'nav-item';
        navItem4.innerHTML = '<i class="fas fa-cog"></i>Settings';

        navList.appendChild(navItem);
        navList.appendChild(navItem2);
        navList.appendChild(navItem3);
        navList.appendChild(navItem4);
        
        sidebar.appendChild(navList);
        dashboardGrid.appendChild(sidebar);

        
        this.#rootElement.appendChild(dashboardGrid);


        const testCardConfig: TestCardConfig = {
                    status: 'success',
                    title: 'User Authentication Flow',
                    duration: '1.2s',
                    environment: 'Chrome 104',
                    progressWidth: '100%',
                    details: `✓ Successfully logged in with valid credentials
        ✓ Invalid credentials rejected
        ✓ Session persistence verified`
        };

        const testCard = new TestCard('card-1');
        testCard.config = testCardConfig;

        dashboardGrid.appendChild(testCard.create());

        //dashboardGrid.appendChild(createTestContainer());

        document.querySelectorAll('.test-card').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('expanded');
            });
        });

    }

    setResult(text: string) {
        const element = document.querySelector<HTMLDivElement>('#card-1');
        
        if (element !== null) {
            const x =  element.getElementsByClassName('prueba');
                
            if (x !== null && x.length > 0) {
                x[0].appendChild(this.#document.createTextNode(text));
            }
        }
    }
}


