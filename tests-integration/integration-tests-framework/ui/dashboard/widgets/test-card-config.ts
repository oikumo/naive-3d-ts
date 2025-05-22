export interface TestCardConfig {
    status: 'success' | 'failed' | 'pending';
    title: string;
    duration: string;
    environment: string;
    progressWidth: string;
    details: string;
}
