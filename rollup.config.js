import svelte from 'rollup-plugin-svelte';
import filesize from 'rollup-plugin-filesize';

export default [
  {
    input: 'src/index.js',
    external: ['svelte', 'svelte/internal', 'svelte/store'],
    output: [
      {
        file: 'dist/svelte-elements.es.js',
        format: 'es',
        sourcemap: true
      },
      {
        file: 'dist/svelte-elements.cjs.js',
        format: 'cjs',
        sourcemap: true
      }
    ],
    plugins: [svelte(), filesize()]
  }
];
