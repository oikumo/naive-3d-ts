import { HtmlScreen } from './screen/html-screen/html-screen.ts';
import { UserInputLogger } from "./user/user-input-logger.ts";
import { Main } from './main/main.ts';
import * as blasWasm from 'naive-blas-wasm';

const userInputLogger = new UserInputLogger();
const screen = new HtmlScreen();

screen.setMouseObserver(userInputLogger);

async function loadWasm() {
  let blas: blasWasm.MainModule | null = null;
  try {  
    blas = await blasWasm.default();
  } catch (err) {
    console.error(err);
    return null;
  }

  if (blas == null){
    return null;
  } 

  console.log(`draw: ${blas.draw(2222)}`);
  
    const length = 10;
    const ptr = blas._malloc(length * 4); // Allocate 40 bytes (10 Uint32s)

    // Access via HEAPU32
    const sharedArray = new Uint32Array(
      blas.HEAPU32.buffer,
      ptr,
      length
    );

    // Modify from TypeScript
    sharedArray[0] = 42;
  
    // Modify from C++ (via exported function)
    blas.ccall(
      "modify_array",
      null,
      ["number", "number", "number"],
      [ptr, 1, 123]
    );

  
    console.log(sharedArray[1]); // Output: 123
    console.log(sharedArray[0]); // Output: 123
  
    blas.modify_array(ptr, 3, 112);

    sharedArray.forEach(a => {
      console.log(a);
    }) 

    // Free memory
    blas._free(ptr);

    sharedArray.forEach(a => {
      console.log(a);
    });
    
    blas.modify_array(ptr, 3, 112);


    sharedArray.forEach(a => {
      console.log(`original: ${a}`);
    });
    blas.multiply(5, ptr, length);
    sharedArray.forEach(a => {
      console.log(`changed: ${a}`);
    });


    console.log('');

    console.log(blas.int_sqrt(9));

      // Allocate memory
      const length1 = 100;
      const ptr1 = blas._malloc(length1 * 4);
      
      // Access via HEAPU32
      const arr1 = new Uint32Array(
        blas.HEAPU32.buffer,
        ptr1,
        length1
      );

      console.log(arr1);
      
    // Use all exported methods
    blas.setValue(ptr1 + 4, 42, "i32");  // Direct memory write
    console.log(blas.getValue(ptr1 + 4, "i32")); // → 42
    
    // String conversion
    const strPtr = blas.stringToUTF8("Hel lo WASM", blas.stackAlloc(256), 256);
    console.log(blas.UTF8ToString(strPtr)); // → "Hello WASM"
    console.log(strPtr);
    
    blas._free(ptr1);
    var data = new blas.Data();

    data.createArray(100000);
    for (let i = 0; i < 100000; i++) {
      data.set(i, 99);
    }
    
    const log = new Array<number>();
    
    for (let i = 0; i < 100000; i++) {
      log.push(data.get(i));
    }

    console.log(log.join(','));

    data.delete;
    
    return blas;
}

async function init() {
    const blas = await loadWasm();
    console.log(blas);
    const main = new Main(screen);
    main.run();
}

await init();

  

