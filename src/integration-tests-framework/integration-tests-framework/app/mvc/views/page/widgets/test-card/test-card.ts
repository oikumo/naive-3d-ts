import { GlobalStyle } from "../../../../../html/style";
import { TestCardInfo } from "./test-card-info";
import { TestCardState } from "./test-card-state";
import { DOM } from "../../../../../html/dom";

export class TestCard {
    #id: string;
    #config: TestCardInfo;
    #card: HTMLDivElement | null = null;

    constructor(id: string, config: TestCardInfo) {
        this.#id = id;
        this.#config = config;
    }

    create() {
        this.#card = this.#createTestCard(this.#id, this.#config);
        const title = this.#createTitle();
        const status = this.#createStatusIndicator();
        const progressBar = this.#createProgressBar();
        const details = this.#createDetails();
        const meta = this.#createMeta();

        this.#card.append(
            status,
            title,
            meta,
            progressBar,
            details
        );
        return this.#card;
    }

    #createTestCard(id: string, config: TestCardInfo): HTMLDivElement {
        let classId = GlobalStyle.CLASS_ID.TestCardStatusFailed;

        switch (config.status) {
            case TestCardState.PENDING: classId = GlobalStyle.CLASS_ID.TestCardStatusPending; break;
            case TestCardState.SUCCESS: classId = GlobalStyle.CLASS_ID.TestCardStatusSuccess; break;
        }
    
        const card = DOM.createDiv(classId);
        card.id = id;
        return card;
    }

    #createMeta() {
        const meta = DOM.createDiv('test-meta');

        ['duration', 'environment'].forEach(text => {
            const span = document.createElement('span');
            span.textContent = `${text.charAt(0).toUpperCase() + text.slice(1)}: 
            ${this.#config[text as keyof Omit<TestCardInfo, 'status' | 'progressWidth' | 'details'>]}`;
            meta.appendChild(span);
        });

        return meta;
    }

    #createDetails() {
        const details = DOM.createDiv('test-details');
        const pre = DOM.createElement('pre');

        pre.textContent = this.#config.details;
        pre.className = "prueba";

        details.appendChild(pre);

        return details;
    }

    #createTitle() {
        const title = DOM.createElement('h3');
        title.className = 'test-title';
        title.textContent = this.#config.title;

        return title;
    }

    #createStatusIndicator() {
        const statusDiv = DOM.createDiv(`test-status status-${this.#config.status}`);

        const icon = DOM.createElement('i');

        icon.className = 'fas ' + ({
            none: 'fa-clock',
            success: 'fa-check-circle',
            failed: 'fa-times-circle',
            pending: 'fa-clock'
        }[this.#config.status]);

        statusDiv.appendChild(icon);
        statusDiv.appendChild(document.createTextNode(` ${this.#config.status.charAt(0).toUpperCase() + this.#config.status.slice(1)}`));

        return statusDiv;
    }

    #createProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.width = this.#config.progressWidth;
        progressContainer.appendChild(progressBar);

        return progressContainer;
    }
}

