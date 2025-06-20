import { equals, test } from "naive-tests-ts";
import { CoreBufferF32 } from '../../../src/core/types/buffers';

test('types/arrays', (logs) => {
    const capacity = 4;
    const elementSize = 100;
    const buffer = new CoreBufferF32(capacity, elementSize);
    
    logs?.push('buffer element size: ' + elementSize);

    equals(true, buffer !== null);

    
});