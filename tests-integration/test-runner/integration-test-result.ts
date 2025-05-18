export class IntegrationTestResult {
    result: string;
    testName: string;

    constructor(testName: string, result: string) {
        this.testName = testName;
        this.result = result;
    }
}
