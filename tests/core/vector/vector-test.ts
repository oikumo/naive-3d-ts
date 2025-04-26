import { equals, notEquals, test } from "naive-tests-ts";
import { Vector } from '../../../src/core/vector/vector'

test('vector creation empty', () => {
    let vector = new Vector();
    equals(0, vector.length);

    vector.access((data) => equals(true, data !== null))
});

test('vector creation with different sizes with default value 0', () => {
    const v1 = Vector.create(10);
    equals(10, v1.length);

    const v2 = Vector.create(5);
    notEquals(v1.length, v2.length);

    v2.access((data)  => {
        if (!data) throw Error();
        for (let i = 0; i < data.length; i++) {
            equals(0, data[i]);
        }
    });
});

test('vector element read and write access only, the reference can not be changed', () => {
    const vectorElements = 9;
    const originalElementsValue = 21;
    const dataReplacement = new Uint32Array([100, 101, 102]);

    const vector = Vector.create(vectorElements);
    
    vector.access((data)  => {
        for (let i = 0; i < data.length; i++) {
            data[i] = originalElementsValue;
        }
    });

    vector.access((data)  => {
        for (let i = 0; i < data.length; i++) {
            equals(originalElementsValue, data[i]);
        }
    });

    vector.access((data) => { data = dataReplacement; });
    vector.access(data => {
        equals(vectorElements, data.length);
        for (let i = 0; i < data.length; i++) {
            equals(originalElementsValue, data[i]);
        }
    });

    vector.access((data) => { data = new Uint32Array([1]); });
    vector.access(data => {
        equals(vectorElements, data.length);
        for (let i = 0; i < data.length; i++) {
            equals(originalElementsValue, data[i]);
        }
    });
});

test('vector element data initialization with zeroes', () => {
    const vectorElements = 10;
    const vector = Vector.create(vectorElements);
    let elementsCount = 0;

    let sum = 0;
    vector.access((data)  => {
        if (data === null) return;
        for (let i = 0; i < data.length; i++) {
            equals(0, data[i]);
            sum += data[i];
            elementsCount++;
        }
    });

    equals(vectorElements, elementsCount);
    equals(0, sum);
});