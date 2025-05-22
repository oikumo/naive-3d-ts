import { DashboardTestResult } from "../ui/dashboard/controllers/interface/DashboardTestResult";
import { HtmlLogger } from '../ui/logger/html-logger';
import { IntegrationTestResult } from './integration-test-result';

export type TestFunc = (logger: HtmlLogger) => Promise<void>;

export class IntegrationTestRunner {
    #tests: Array<TestFunc>;
    #results = new Array<IntegrationTestResult>();

    get results() { return this.#results; }

    constructor(tests: Array<TestFunc>) {
        this.#tests = tests;
    }

    async * runIntegrationTests(logger: HtmlLogger) {
        this.#results.length = 0;

        for (let test of this.#tests) {
            const testResult = new DashboardTestResult();

            logger.newTestResult(test.name);
            logger.log(`test: ${test.name} begin`);
            try {
                await test(logger);
                const result = new IntegrationTestResult(test.name, 'pass');
                this.#results.push(result);
                yield result;

            } catch(err) {
                console.log(err);
                const result = new IntegrationTestResult(test.name, 'fail');
                this.#results.push(result);
                yield result;
            }
            logger.log(`test: ${test.name} end`);
            logger.addResult();
        }
    }
}
