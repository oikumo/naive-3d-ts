import { Blas } from "../../../src/core/blas/blas";
import { loadBlasModule } from "../../../src/core/blas/blas-loader";
import { HtmlLogger } from "../../logger/html-logger";


export async function blasSharedArrayTest(logger: HtmlLogger)  {   
    const blas = await loadBlasModule();

    const array = blas.createSharedArray("TEST_1", 10);
    if (array.data === null) throw Error();
    if (array.ptr === null) throw Error();

    logger.log(`1. array. ' ${array.info()}`);

    blas.builtInModifyArray(array.ptr, 2, 999);
    logger.log(`2. array modified via ccall function index: 2, value: 999. ' ${array.info()}`);


    array.data[0] = 997;
    array.data[1] = 998;
    logger.log(`3. array modified directly. ' ${array.info()}`);

    for (let i = 0; i < 1000; i++) {
        console.log(`delay: ${i}`);
    }


    blas.module.modify_array(array.ptr, 3, 1000);

    logger.log(`4. modification by blas wasm function' ${array.info()}`);


    blas.module.multiply(5, array.ptr, array.length);

    logger.log(`5. multiplication by 5 using blas wasm function' ${array.info()}`);

    const ptrOffset = 4;
    blas.module.setValue(array.ptr + ptrOffset, 42, "i32");

    logger.log(`6. direct memory write access by pointer' ${array.info()}`);

    blas.module._free_array(array.ptr);
    logger.log(`7. after array free memory ${array.info()}`);
}    
