// The entry file of your WebAssembly module.

export function modify_array(ptr: usize, index: i32, value: u32): void {
  store<u32>(ptr + (index << 2), value);
}

export function draw(val: i32): i32 {
  return val;
}

export function int_sqrt(val: i32): i32 {
  return <i32>Math.sqrt(<f64>val);
}

export function drawTexToTex(
  destPtr: usize,
  destWidth: i32,
  srcPtr: usize,
  srcWidth: i32,
  srcHeight: i32,
  destX: f32,
  destY: f32
): void {
  for (let y: i32 = 0; y < srcHeight; y++) {
    for (let x: i32 = 0; x < srcWidth; x++) {
      let targetX: i32 = <i32>Math.floor(destX + <f32>x);
      let targetY: i32 = <i32>Math.floor(destY + <f32>y);

      if (targetX >= 0 && targetX < destWidth) {
        let destIdx: i32 = targetY * destWidth + targetX;
        let srcIdx: i32 = y * srcWidth + x;

        store<u32>(destPtr + (<usize>destIdx << 2), load<u32>(srcPtr + (<usize>srcIdx << 2)));
      }
    }
  }
}

export function arrayFloat32ModifySegment(destPtr: usize, destIndex: i32, srcPtr: usize, srcLength: i32): void {
  for (let i: i32 = 0; i < srcLength; i++) {
    store<f32>(destPtr + (<usize>(destIndex + i) << 2), load<f32>(srcPtr + (<usize>i << 2)));
  }
}

export function multiply(scalar: f32, ptr: usize, length: i32): void {
  for (let i: i32 = 0; i < length; i++) {
    let val = load<f32>(ptr + (<usize>i << 2));
    store<f32>(ptr + (<usize>i << 2), val * scalar);
  }
}

export class Data {
  private _array: Uint32Array | null = null;

  createArray(length: i32): void {
    this._array = new Uint32Array(length);
  }

  set(index: i32, value: u32): void {
    if (this._array) {
      this._array![index] = value;
    }
  }

  get(index: i32): u32 {
    if (this._array) {
      return this._array![index];
    }
    return 0;
  }
}
