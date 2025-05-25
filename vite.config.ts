import { defineConfig, IndexHtmlTransform } from 'vite';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import wasmEsm from 'vite-plugin-wasm-esm'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import copy from 'rollup-plugin-copy';


export default defineConfig(({ mode }) => {

  return {
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
      }),
      {
        name: 'customHtmlReplace',
        transformIndexHtml(html) {
          let htmlResult = html;

          if (mode === 'test-integration') {
            htmlResult = htmlResult.replace(
              '<script type="module" src="src/main.ts"></script>',
              '<script type="module" src="tests-integration/run-integration-test.ts"></script>'
            );
            htmlResult = htmlResult.replace(
              '<link rel="stylesheet" type="text/css" href="./styles/style.css" />',
              '<link rel="stylesheet" type="text/css" href="./styles/style-test-integration.css" />'
            );

          }

          return htmlResult;
        },
      },
    ],
    optimizeDeps: {
      exclude: ["module"],
    }
  }
});
