import { IntegrationTestRunner } from './test-runner/integration-test-runner';
import { HtmlLogger } from './logger/html-logger';
import { blasArrayTest } from './test-suite/blas/blas-array-test';
import { blasClassesTest } from './test-suite/blas/blas-classes-test';
import { blasWasmModuleTest } from './test-suite/blas/blas-wasm-module-test';

const runner = new IntegrationTestRunner([
    blasClassesTest,
    blasWasmModuleTest,
    blasArrayTest
]);

const logger = new HtmlLogger();

for await (const result of runner.runIntegrationTests(logger)) {
    logger.success(`name: ${result.testName} result: ${result.result}`);
}

