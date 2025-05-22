import { loadBlasModule } from "../../../src/core/blas/blas-loader";
import { HtmlLogger } from "../../integration-tests-framework/ui/logger/html-logger";

export async function blasClassesTest(logger: HtmlLogger) {
    const blas = await loadBlasModule();

    const data = new blas.module.Data();
    data.createArray(100000);

    for (let i = 0; i < 100000; i++) {
        data.set(i, 99);
    }

    data.delete;
    logger.log('class Data instance post delete. ');    
}