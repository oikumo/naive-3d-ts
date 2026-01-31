/** Exported memory */
export declare const memory: WebAssembly.Memory;
// Exported runtime interface
export declare function __new(size: number, id: number): number;
export declare function __pin(ptr: number): number;
export declare function __unpin(ptr: number): void;
export declare function __collect(): void;
export declare const __rtti_base: number;
/**
 * assembly/index/modify_array
 * @param ptr `usize`
 * @param index `i32`
 * @param value `u32`
 */
export declare function modify_array(ptr: number, index: number, value: number): void;
/**
 * assembly/index/draw
 * @param val `i32`
 * @returns `i32`
 */
export declare function draw(val: number): number;
/**
 * assembly/index/int_sqrt
 * @param val `i32`
 * @returns `i32`
 */
export declare function int_sqrt(val: number): number;
/**
 * assembly/index/drawTexToTex
 * @param destPtr `usize`
 * @param destWidth `i32`
 * @param srcPtr `usize`
 * @param srcWidth `i32`
 * @param srcHeight `i32`
 * @param destX `f32`
 * @param destY `f32`
 */
export declare function drawTexToTex(destPtr: number, destWidth: number, srcPtr: number, srcWidth: number, srcHeight: number, destX: number, destY: number): void;
/**
 * assembly/index/drawTexToTexScaled
 * @param destPtr `usize`
 * @param destWidth `i32`
 * @param srcPtr `usize`
 * @param srcWidth `i32`
 * @param srcHeight `i32`
 * @param destX `f32`
 * @param destY `f32`
 * @param destScaleX `f32`
 * @param destScaleY `f32`
 */
export declare function drawTexToTexScaled(destPtr: number, destWidth: number, srcPtr: number, srcWidth: number, srcHeight: number, destX: number, destY: number, destScaleX: number, destScaleY: number): void;
/**
 * assembly/index/arrayFloat32ModifySegment
 * @param destPtr `usize`
 * @param destIndex `i32`
 * @param srcPtr `usize`
 * @param srcLength `i32`
 */
export declare function arrayFloat32ModifySegment(destPtr: number, destIndex: number, srcPtr: number, srcLength: number): void;
/**
 * assembly/index/multiply
 * @param scalar `f32`
 * @param ptr `usize`
 * @param length `i32`
 */
export declare function multiply(scalar: number, ptr: number, length: number): void;
