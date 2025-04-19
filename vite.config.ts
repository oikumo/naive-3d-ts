import { defineConfig } from 'vite';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait()],
  // Optional: Optimize dependencies for WASM
  optimizeDeps: {
    exclude: ["mainx"], // Exclude WASM packages from optimization
  },
});