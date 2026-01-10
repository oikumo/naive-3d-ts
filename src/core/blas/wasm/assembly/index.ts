// The entry file of your WebAssembly module.

export function modify_array(ptr: usize, index: i32, value: u32): void {
  store<u32>(ptr + (index << 2), value);
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
