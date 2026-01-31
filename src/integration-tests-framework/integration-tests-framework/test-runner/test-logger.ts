import { TestRunnerExecution } from "./test-runner-execution";


export class TestLogger {

    #runner: TestRunnerExecution;

    constructor(runner: TestRunnerExecution) {
        this.#runner = runner;
    }

    log(message: string) {
        this.#runner.currentTestLog(message);
    }
}
