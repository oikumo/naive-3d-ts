export enum TestExecutionState {
    NONE,
    PASS, 
    FAIL
}

export class TestExecution {
    result: TestExecutionState = TestExecutionState.NONE;
    testName: string = '';
    description: string = '';
    messages = new Array<string>();
    error: string | null = null;

    constructor(testName: string, description = '') {
        this.testName = testName;
        this.description = description;
    }
}