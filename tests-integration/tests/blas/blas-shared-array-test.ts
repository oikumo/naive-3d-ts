import { TestLogger } from "naive-3d-integration-ts";
import { BlasArrayUint32 } from "../../../src/core/blas/blas-array";
import { loadBlasModule } from "../../../src/core/blas/blas-loader";

function logArray(array: BlasArrayUint32) {
    const data = new Array<string>();

    for (let i = 0; i < array.length; i++) {
        data.push(array.data[i].toString());
    }

    return data.join(',');
}

export async function blasSharedArrayTest(logger: TestLogger)  {   
    const blas = await loadBlasModule();

    throw Error();

    const array = blas.createSharedArray("TEST_1", 10);
    if (array.data === null) throw Error();
    if (array.ptr === null) throw Error();

    logger.log(`1. array. ' ${logArray(array)}`);

    blas.builtInModifyArray(array.ptr, 2, 999);
    logger.log(`2. array modified via ccall function index: 2, value: 999. ' ${logArray(array)}`);


    array.data[0] = 997;
    array.data[1] = 998;
    logger.log(`3. array modified directly. ' ${logArray(array)}`);

    for (let i = 0; i < 10000; i++) {
    }


    blas.module.modify_array(array.ptr, 3, 1000);

    logger.log(`4. modification by blas wasm function' ${logArray(array)}`);


    blas.module.multiply(5, array.ptr, array.length);

    logger.log(`5. multiplication by 5 using blas wasm function' ${logArray(array)}`);

    const ptrOffset = 4;
    blas.module.setValue(array.ptr + ptrOffset, 42, "i32");

    logger.log(`6. direct memory write access by pointer' ${logArray(array)}`);

    blas.module._free_array(array.ptr);
    logger.log(`7. after array free memory ${logArray(array)}`);
}    
