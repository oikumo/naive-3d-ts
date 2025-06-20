import { test, equals } from "naive-tests-ts";

test('buffers', (log) => {
    const elementsComponents = 3;
    const elementsBufferSize = 17;
    const elements = elementsBufferSize * elementsComponents;
    const positions = new Float32Array(elements);

    equals(positions.BYTES_PER_ELEMENT, Float32Array.BYTES_PER_ELEMENT);
    equals(positions.buffer.byteLength, elements * Float32Array.BYTES_PER_ELEMENT);

    positions.forEach((a) => { equals(a, 0);});
    
    positions.fill(1);
    positions.forEach((a) => { equals(a, 1); });
    
    let x = 1;
    positions.forEach((a, i) => { positions[i] *= x; x++; });

    positions.fill(0);
    positions.forEach((a) => { equals(a, 0);});
});