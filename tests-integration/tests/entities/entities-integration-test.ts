import { HtmlLogger } from "naive-3d-integration-ts";
import { EntityManager } from "../../../src/base/scene/entity-manager";
import { BlasArrayF32 } from "../../../src/core/blas/blas-array";
import { IntegrationTestContext } from "../../common/blas-context";

export async function entitiesIntegrationTest(logger: HtmlLogger) {
    const context = await IntegrationTestContext.create();
    
    throw Error();
    const capacity = 1000;
    const entityManager = new EntityManager(context.blas, new BlasArrayF32(context.blas, capacity));

    
    logger.log(`totalCapacity: ${entityManager.totalCapacity}`);
    logger.log(`available: ${entityManager.avaliable}`);

    const a = 1.1;
    
    const entitiesId = new Array<number>();

    for (let i = 0; i < 3; i++) {
        entitiesId.push(entityManager.addEntity(i, i, i));
    }

    entitiesId.forEach((id) => {
        logger.log(`entity id ${id} : ${entityManager.getEntity(id)}`);
    });
    
    logger.log(`totalCapacity: ${entityManager.totalCapacity}`);
    logger.log(`available: ${entityManager.avaliable}`);

    const arrayDataLog = Array<string>();

    const array = new BlasArrayF32(context.blas, 50);
    const arraySegment = new BlasArrayF32(context.blas, 4);

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