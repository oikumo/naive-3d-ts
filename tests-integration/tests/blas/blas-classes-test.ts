import { TestLogger } from "naive-3d-integration-ts";
import { loadBlasModule } from "../../../src/core/blas/blas-loader";

export async function blasClassesTest(logger: TestLogger) {
    const blas = await loadBlasModule();

    throw Error();

    const data = new blas.module.Data();
    data.createArray(100000);

    for (let i = 0; i < 100000; i++) {
        data.set(i, 99);
    }

    data.delete;
    logger.log('class Data instance post delete. ');    
}