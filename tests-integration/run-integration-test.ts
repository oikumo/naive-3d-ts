import { IntegrationTestRunner } from './test-runner/integration-test-runner';
import { HtmlLogger } from './logger/html-logger';
import { blasSharedArrayTest } from './test-suite/blas/blas-shared-array-test';
import { blasClassesTest } from './test-suite/blas/blas-classes-test';
import { blasWasmModuleTest } from './test-suite/blas/blas-wasm-module-test';
import { entitiesIntegrationTest } from './test-suite/entities/entities-integration-test';

const runner = new IntegrationTestRunner([
    entitiesIntegrationTest,
    blasClassesTest,
    blasWasmModuleTest,
    blasSharedArrayTest
]);


const logger = new HtmlLogger();

for await (const result of runner.runIntegrationTests(logger)) {
    logger.success(`name: ${result.testName} result: ${result.result}`);
}

