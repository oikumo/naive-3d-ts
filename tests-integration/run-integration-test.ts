import { Information, IntegrationTestRunner, MainController } from 'naive-3d-integration-ts';
import { entitiesIntegrationTest } from './tests/entities/entities-integration-test';
import { blasClassesTest } from './tests/blas/blas-classes-test';
import { blasWasmModuleTest } from './tests/blas/blas-wasm-module-test';
import { blasSharedArrayTest } from './tests/blas/blas-shared-array-test';

const runner = new IntegrationTestRunner([
    entitiesIntegrationTest,
    blasClassesTest,
    blasWasmModuleTest,
    blasSharedArrayTest 
]);


const dashboard = new MainController(
    new Information('Naive 3D Test', '0.0.1'), runner
);

dashboard.showAsync();