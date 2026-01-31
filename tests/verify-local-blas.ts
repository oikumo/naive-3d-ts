import loadLocalBlas from '../src/core/blas/local-blas';

async function testLocalBlas() {
    console.log("Starting LocalBlasModule tests...");
    const blas = await loadLocalBlas();

    // Test _malloc
    const ptr1 = blas._malloc(100);
    const ptr2 = blas._malloc(200);
    console.log(`ptr1: ${ptr1}, ptr2: ${ptr2}`);
    if (ptr2 <= ptr1 + 100) {
        console.error("FAILED: _malloc overlap or incorrect allocation");
    } else {
        console.log("PASSED: _malloc basic allocation");
    }

    // Test modify_array via ccall
    blas.ccall("modify_array", null, ["number", "number", "number"], [ptr1, 5, 1234]);
    const uint32View = new Uint32Array(blas.buffer, ptr1);
    if (uint32View[5] === 1234) {
        console.log("PASSED: modify_array via ccall");
    } else {
        console.error(`FAILED: modify_array via ccall. Expected 1234, got ${uint32View[5]}`);
    }

    // Test drawTexToTex
    const srcPtr = blas._malloc(4 * 4 * 4); // 4x4 RGBA (uint32)
    const destPtr = blas._malloc(10 * 10 * 4); // 10x10 RGBA (uint32)

    const srcView = new Uint32Array(blas.buffer, srcPtr, 16);
    const destView = new Uint32Array(blas.buffer, destPtr, 100);

    srcView.fill(0xFF0000FF); // Red
    destView.fill(0x000000FF); // Black

    blas.drawTexToTex(destPtr, 10, srcPtr, 4, 4, 2, 2);

    // Check a pixel inside the blit area (2,2) in dest
    const destIndex = 2 * 10 + 2;
    if (destView[destIndex] === 0xFF0000FF) {
        console.log("PASSED: drawTexToTex basic blit");
    } else {
        console.error(`FAILED: drawTexToTex. Expected 0xFF0000FF at index ${destIndex}, got ${destView[destIndex].toString(16)}`);
    }

    console.log("Tests completed.");
}

testLocalBlas();
