import { loadBlasModule } from "../../../src/core/blas/blas-loader";
import { HtmlLogger } from "../../logger/html-logger";

export async function blasWasmModuleTest(logger: HtmlLogger) {
    const blas = await loadBlasModule();
    
    logger.log(`1. blas draw function call: ${blas.module.draw(2222)}`);
    logger.log(`2. blas int_sqrt function call: ${blas.module.int_sqrt(9)}`);

    const strPtr = blas.module.stringToUTF8("Hello WASM", blas.module.stackAlloc(256), 256);
    const text = blas.module.UTF8ToString(strPtr);
    logger.log(`3. stack string utf8 ptr: ${strPtr}, text: ${text}`);
}