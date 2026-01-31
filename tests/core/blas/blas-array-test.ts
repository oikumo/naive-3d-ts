import { test, equals } from "naive-tests-ts";
import { BlasArrayF32, BlasArrayUint32 } from '../../../src/core/blas/blas-array';
import { Blas } from '../../../src/core/blas/blas';
import { LocalBlasModule } from '../../../src/core/blas/local-blas';

// Mock BLAS module for testing
class MockBlasModule {
    buffer: ArrayBuffer = new ArrayBuffer(1024 * 1024);
    _mallocCalled: number[] = [];
    _freedPointers: number[] = [];
    
    _malloc(size: number): number {
        const ptr = this._mallocCalled.length * 100; // Simple mock pointer
        this._mallocCalled.push(size);
        return ptr;
    }
    
    _free(ptr: number): void {
        this._freedPointers.push(ptr);
    }
    
    ccall(name: string, returnType: any, argTypes: any[], args: any[]): void {
        // Mock implementation for modify_array
        if (name === "modify_array") {
            // Don't do anything for the mock
        }
    }
}

// Mock BLAS class
class MockBlas {
    module: LocalBlasModule;
    
    constructor() {
        this.module = new MockBlasModule() as any;
    }
}

test('BlasArrayF32 constructor initializes with zeros', () => {
    const mockBlas = new MockBlas();
    const array = new BlasArrayF32(mockBlas as any, 10);
    
    equals(10, array.length);
    equals(false, array.isDisposed);
    
    // Check that data is initialized to zeros
    const data = array.data;
    for (let i = 0; i < data.length; i++) {
        equals(0, data[i]);
    }
});

test('BlasArrayF32 data access returns Float32Array', () => {
    const mockBlas = new MockBlas();
    const array = new BlasArrayF32(mockBlas as any, 5);
    
    const data = array.data;
    equals(true, data instanceof Float32Array);
    equals(5, data.length);
});

test('BlasArrayF32 data modification persists', () => {
    const mockBlas = new MockBlas();
    const array = new BlasArrayF32(mockBlas as any, 5);
    
    // Modify data
    const data = array.data;
    data[0] = 1.5;
    data[2] = 3.7;
    
    // Access data again and verify changes persist
    const data2 = array.data;
    equals(1.5, data2[0]);
    equals(0, data2[1]); // Unchanged
    // Use approximate equality for floating point comparison
    equals(true, Math.abs(3.7 - data2[2]) < 0.0001);
});

test('BlasArrayF32 dispose frees memory', () => {
    const mockBlas = new MockBlas();
    const array = new BlasArrayF32(mockBlas as any, 10);
    
    array.dispose();
    
    equals(true, array.isDisposed);
    equals(1, (mockBlas.module as any)._freedPointers.length);
});

test('BlasArrayF32 double dispose is safe', () => {
    const mockBlas = new MockBlas();
    const array = new BlasArrayF32(mockBlas as any, 10);
    
    array.dispose();
    array.dispose(); // Should not cause issues
    
    equals(true, array.isDisposed);
    equals(1, (mockBlas.module as any)._freedPointers.length); // Only freed once
});

test('BlasArrayF32 access after dispose throws error', () => {
    const mockBlas = new MockBlas();
    const array = new BlasArrayF32(mockBlas as any, 10);
    
    array.dispose();
    
    try {
        const data = array.data;
        equals(false, true); // Should not reach here
    } catch (error) {
        equals(true, error instanceof Error);
        equals("Cannot access data of disposed BlasArrayF32", error.message);
    }
});

test('BlasArrayUint32 constructor initializes with zeros', () => {
    const mockBlas = new MockBlas();
    const array = new BlasArrayUint32(mockBlas as any, 10);
    
    equals(10, array.length);
    equals(false, array.isDisposed);
    
    // Check that data is initialized to zeros
    const data = array.data;
    for (let i = 0; i < data.length; i++) {
        equals(0, data[i]);
    }
});

test('BlasArrayUint32 data access returns Uint32Array', () => {
    const mockBlas = new MockBlas();
    const array = new BlasArrayUint32(mockBlas as any, 5);
    
    const data = array.data;
    equals(true, data instanceof Uint32Array);
    equals(5, data.length);
});

test('BlasArrayUint32 data modification persists', () => {
    const mockBlas = new MockBlas();
    const array = new BlasArrayUint32(mockBlas as any, 5);
    
    // Modify data
    const data = array.data;
    data[0] = 123;
    data[2] = 456;
    
    // Access data again and verify changes persist
    const data2 = array.data;
    equals(123, data2[0]);
    equals(0, data2[1]); // Unchanged
    equals(456, data2[2]);
});

test('BlasArrayUint32 dispose frees memory', () => {
    const mockBlas = new MockBlas();
    const array = new BlasArrayUint32(mockBlas as any, 10);
    
    array.dispose();
    
    equals(true, array.isDisposed);
    equals(1, (mockBlas.module as any)._freedPointers.length);
});

test('BlasArrayUint32 double dispose is safe', () => {
    const mockBlas = new MockBlas();
    const array = new BlasArrayUint32(mockBlas as any, 10);
    
    array.dispose();
    array.dispose(); // Should not cause issues
    
    equals(true, array.isDisposed);
    equals(1, (mockBlas.module as any)._freedPointers.length); // Only freed once
});

test('BlasArrayUint32 access after dispose throws error', () => {
    const mockBlas = new MockBlas();
    const array = new BlasArrayUint32(mockBlas as any, 10);
    
    array.dispose();
    
    try {
        const data = array.data;
        equals(false, true); // Should not reach here
    } catch (error) {
        equals(true, error instanceof Error);
        equals("Cannot access data of disposed BlasArrayUint32", error.message);
    }
});

test('BlasArrayF32 with zero length', () => {
    const mockBlas = new MockBlas();
    const array = new BlasArrayF32(mockBlas as any, 0);
    
    equals(0, array.length);
    equals(false, array.isDisposed);
    
    const data = array.data;
    equals(0, data.length);
});

test('BlasArrayUint32 with zero length', () => {
    const mockBlas = new MockBlas();
    const array = new BlasArrayUint32(mockBlas as any, 0);
    
    equals(0, array.length);
    equals(false, array.isDisposed);
    
    const data = array.data;
    equals(0, data.length);
});

test('BlasArrayF32 memory allocation size calculation', () => {
    const mockBlas = new MockBlas();
    const arrayLength = 100;
    const array = new BlasArrayF32(mockBlas as any, arrayLength);
    
    // Check that malloc was called with correct size
    const expectedSize = arrayLength * Float32Array.BYTES_PER_ELEMENT;
    equals(expectedSize, (mockBlas.module as any)._mallocCalled[0]);
});

test('BlasArrayUint32 memory allocation size calculation', () => {
    const mockBlas = new MockBlas();
    const arrayLength = 100;
    const array = new BlasArrayUint32(mockBlas as any, arrayLength);
    
    // Check that malloc was called with correct size
    const expectedSize = arrayLength * Uint32Array.BYTES_PER_ELEMENT;
    equals(expectedSize, (mockBlas.module as any)._mallocCalled[0]);
});