import { TestCardState } from "./test-card-state";

export interface TestCardInfo {
    status: TestCardState;
    title: string;
    duration: string;
    environment: string;
    progressWidth: string;
    details: string;
}
