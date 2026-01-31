import { ITestRunnerObserver, TestRunnerExecution } from './test-runner-execution';
import { TestLogger } from "./test-logger";

export type IntegrationTestFunction = (logger: TestLogger) => Promise<void>;

export class IntegrationTestRunner {
    #tests: Array<IntegrationTestFunction>;

    constructor(tests: Array<IntegrationTestFunction> | null = null) {
        if (tests !== null) {
            this.#tests = tests;
        } else { 
            this.#tests = new Array<IntegrationTestFunction>();
        }
    }

    setTests(tests: Array<IntegrationTestFunction>) {
        this.#tests = tests;
    }

    async executeTests(observer: ITestRunnerObserver) {
        const logger = new TestRunnerExecution();
        observer.updateResults(logger.executions);

        for (let test of this.#tests) {
            logger.newExecution(test.name);

            try {
                await test(logger.logger);
                logger.result(true);

            } catch(err) {
                if (err instanceof Error) { 
                    logger.result(false, err.message);
                } else {
                    logger.result(false);
                }
            }

            observer.updateResults(logger.executions);
        }
    }
}
