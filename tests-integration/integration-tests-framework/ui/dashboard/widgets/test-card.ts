import { TestCardConfig } from "./test-card-config";

export class TestCard {
    id: string;
    config: TestCardConfig;

    constructor(id: string) {
        this.id = id;
    }

    create() {
        return createTestCard(this.id, this.config);
    }
}

export function createTestCard(id: string, config: TestCardConfig): HTMLDivElement {
    // Create main card container
    const card = document.createElement('div');
    card.id = id;
    card.className = `test-card status-${config.status}`;

    // Create status indicator
    const statusDiv = document.createElement('div');
    statusDiv.className = `test-status status-${config.status}`;

    // Create status icon
    const icon = document.createElement('i');
    icon.className = 'fas ' + ({
        success: 'fa-check-circle',
        failed: 'fa-times-circle',
        pending: 'fa-clock'
    }[config.status]);

    // Add icon and text to status div
    statusDiv.appendChild(icon);
    statusDiv.appendChild(document.createTextNode(` ${config.status.charAt(0).toUpperCase() + config.status.slice(1)}`));

    // Create title
    const title = document.createElement('h3');
    title.className = 'test-title';
    title.textContent = config.title;

    // Create meta information
    const meta = document.createElement('div');
    meta.className = 'test-meta';
    ['duration', 'environment'].forEach(text => {
        const span = document.createElement('span');
        span.textContent = `${text.charAt(0).toUpperCase() + text.slice(1)}: ${config[text as keyof Omit<TestCardConfig, 'status' | 'progressWidth' | 'details'>]}`;
        meta.appendChild(span);
    });

    // Create progress container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.width = config.progressWidth;
    progressContainer.appendChild(progressBar);

    // Create details section
    const details = document.createElement('div');
    details.className = 'test-details';
    const pre = document.createElement('pre');
    pre.textContent = config.details;
    pre.className = "prueba";
    details.appendChild(pre);

    // Assemble card components
    card.append(
        statusDiv,
        title,
        meta,
        progressContainer,
        details
    );

    return card;
}
