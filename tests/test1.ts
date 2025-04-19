import { test, assert } from 'naive-tests-ts'
import { equals } from 'naive-tests-ts/dist/assertions/assert-equality';

test("test 1", () => {
    equals(1,1);
    assert.equals(2,"3");
});