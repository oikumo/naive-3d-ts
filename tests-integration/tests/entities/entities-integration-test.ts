import { BlasArray } from "../../../src/core/blas/blas-array";
import { IntegrationTestContext } from "../../integration-tests-framework/common/Integration-test-context";
import { HtmlLogger } from "../../integration-tests-framework/ui/logger/html-logger";

export async function entitiesIntegrationTest(logger: HtmlLogger) {
    const context = await IntegrationTestContext.create();
    const arrayDataLog = Array<string>();

    const array = BlasArray.createFloat32Array(context.blas, 50);
    const arraySegment = BlasArray.createFloat32Array(context.blas, 4);

    for (let i = 0; i < arraySegment.length; i++) {
        arraySegment.data[i] = 6.1;
    }

    logger.log('array');
    for (let i = 0; i < array.length; i++) {
        arrayDataLog.push(array.data[i].toString());
    }
    logger.log(arrayDataLog.join(', '));
    logger.log('');


    context.blas.module.arrayFloat32ModifySegment(array.ptr, 4, arraySegment.ptr, arraySegment.length);

    arrayDataLog.length = 0;
    logger.log('array modified');
        

    for (let i = 0; i < array.length; i++) {
        arrayDataLog.push(array.data[i].toString());
    }

    logger.log(arrayDataLog.join(', '));
    logger.log('');


    
    return;
}