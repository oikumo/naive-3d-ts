import { test, equals } from "naive-tests-ts";
import { EntityManager } from '../../../src/base/scene/entity-manager';

test('entity manager', (log) => {
    const capacity = 5;
    const entityManager = EntityManager.createFromBuffer(capacity);

    log?.push(`totalCapacity: ${entityManager.totalCapacity}`);
    log?.push(`available: ${entityManager.avaliable}`);

    const element1 = entityManager.addEntity(1.1, 2.1, 3.1);
    log?.push(`element added index: ${element1}`);

    log?.push(`totalCapacity: ${entityManager.totalCapacity}`);
    log?.push(`available: ${entityManager.avaliable}`);
});