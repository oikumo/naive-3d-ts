import { IntegrationTestRunner } from './integration-tests-framework/test-runner/integration-test-runner';
import { HtmlLogger } from './integration-tests-framework/ui/logger/html-logger';
import { blasSharedArrayTest } from './tests/blas/blas-shared-array-test';
import { blasClassesTest } from './tests/blas/blas-classes-test';
import { blasWasmModuleTest } from './tests/blas/blas-wasm-module-test';
import { entitiesIntegrationTest } from './tests/entities/entities-integration-test';
import { Dashboard } from './integration-tests-framework/ui/dashboard/dashboard';

const runner = new IntegrationTestRunner([
    entitiesIntegrationTest,
    blasClassesTest,
    blasWasmModuleTest,
    blasSharedArrayTest
]);

const dashboard = new Dashboard();
const logger = new HtmlLogger(dashboard);

for await (const result of runner.runIntegrationTests(logger)) {
    logger.success(`name: ${result.testName} result: ${result.result}`);
}

