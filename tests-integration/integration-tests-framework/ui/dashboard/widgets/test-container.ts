import { createTestCard } from "./test-card";
import { TestCardConfig } from "./test-card-config";

export function createTestContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'test-container';

    const testCards: TestCardConfig[] = [
        {
            status: 'success',
            title: 'User Authentication Flow',
            duration: '1.2s',
            environment: 'Chrome 104',
            progressWidth: '100%',
            details: `✓ Successfully logged in with valid credentials
✓ Invalid credentials rejected
✓ Session persistence verified`
        },
        {
            status: 'failed',
            title: 'Payment Gateway Integration',
            duration: '4.8s',
            environment: 'Firefox 101',
            progressWidth: '60%',
            details: `Error: Transaction timeout (5000ms)
    at paymentProcessor.js:45
    at async processTransaction (main.js:112)`
        },
        {
            status: 'pending',
            title: 'API Response Validation',
            duration: '-',
            environment: 'Staging',
            progressWidth: '0%',
            details: 'Awaiting API endpoint availability...'
        }
    ];

    testCards.forEach(config => {
        const testCard = createTestCard("22", config);
        container.appendChild(testCard);
    });

    return container;
}
