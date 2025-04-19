declare module "*.wasm" {
    const value: string;
    export default value;

    export function int_sqrt(arg0: number): number {
        throw new Error('Function not implemented.');
    }
}