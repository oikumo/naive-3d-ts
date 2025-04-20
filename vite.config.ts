import { defineConfig } from 'vite';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import wasmEsm from 'vite-plugin-wasm-esm'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  assetsInclude: ['**/*.wasm'],
  plugins: [
    wasm(),
    topLevelAwait(),
    /*
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/naive-blas-wasm/dist/*.wasm',
          dest: 'public'
        }
      ],
      watch: {
        reloadPageOnChange: true
      }
    }),*/
    copy({
      targets: [
        { src: 'node_modules/naive-blas-wasm/dist/*.wasm', dest: 'public' }
      ]
    })
  ],
  optimizeDeps: {
    exclude: ["module"],
  }
});
