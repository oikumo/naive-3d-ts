import { test, equals } from "naive-tests-ts";
import { EntityManager } from '../../../src/base/scene/entity-manager';

test('entity manager', (log) => {
    const capacity = 1000;
    const entityManager = EntityManager.createFromBuffer(capacity);

    log?.push(`totalCapacity: ${entityManager.totalCapacity}`);
    log?.push(`available: ${entityManager.avaliable}`);

    const a = 1.1;
    
    const entitiesId = new Array<number>();

    for (let i = 0; i < 3; i++) {
        entitiesId.push(entityManager.addEntity(i, i, i));
    }

    entitiesId.forEach((id) => {
        log?.push(`entity id ${id} : ${entityManager.getEntity(id)}`);
    });
    
    log?.push(`totalCapacity: ${entityManager.totalCapacity}`);
    log?.push(`available: ${entityManager.avaliable}`);
});