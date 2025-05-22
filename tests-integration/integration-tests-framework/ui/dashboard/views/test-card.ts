export interface TestCardConfig {
    status: 'success' | 'failed' | 'pending';
    title: string;
    duration: string;
    environment: string;
    progressWidth: string;
    details: string;
}

export class TestCard {
    #id: string;
    #config: TestCardConfig;
    #card: HTMLDivElement | null;

    constructor(id: string, config: TestCardConfig) {
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

    #createTestCard(id: string, config: TestCardConfig): HTMLDivElement {
        const card = document.createElement('div');
        card.id = id;
        card.className = `test-card status-${config.status}`;

        return card;
    }

    #createMeta() {
        const meta = document.createElement('div');
        meta.className = 'test-meta';
        ['duration', 'environment'].forEach(text => {
            const span = document.createElement('span');
            span.textContent = `${text.charAt(0).toUpperCase() + text.slice(1)}: 
            ${this.#config[text as keyof Omit<TestCardConfig, 'status' | 'progressWidth' | 'details'>]}`;
            meta.appendChild(span);
        });

        return meta;
    }

    #createDetails() {
        const details = document.createElement('div');
        details.className = 'test-details';
        const pre = document.createElement('pre');
        pre.textContent = this.#config.details;
        pre.className = "prueba";
        details.appendChild(pre);

        return details;
    }

    #createTitle() {
        const title = document.createElement('h3');
        title.className = 'test-title';
        title.textContent = this.#config.title;

        return title;
    }

    #createStatusIndicator() {
        const statusDiv = document.createElement('div');
        statusDiv.className = `test-status status-${this.#config.status}`;
        const icon = document.createElement('i');
        icon.className = 'fas ' + ({
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

