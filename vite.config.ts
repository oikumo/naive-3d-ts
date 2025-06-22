import { defineConfig, IndexHtmlTransform } from 'vite';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import wasmEsm from 'vite-plugin-wasm-esm'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import copy from 'rollup-plugin-copy';
import { resolve } from 'path';


export default defineConfig(({ mode }) => {

  let indexPage = 'index-editor.html';
  if (mode === 'test-integration') {
    indexPage = 'index-integration.html';
  }

  const mainHtml = indexPage;

  return {
    assetsInclude: ['**/*.wasm'],
    build: {
      rollupOptions: {
        input: {
          main: mainHtml
        }
      }
    },
    server: {
      open: mainHtml
    },
    plugins: [
      wasm(),
      topLevelAwait(),
      copy({
        targets: [
          { src: 'node_modules/naive-blas-wasm/dist/*.wasm', dest: 'public' }
        ]
      })
    ],
    optimizeDeps: {
      exclude: ["module"],
    }
  }
});
