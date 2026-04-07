import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/uesrpg-rebuilt.ts'),
      fileName: () => 'uesrpg-rebuilt.js',
      formats: ['es'],
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'uesrpg-rebuilt.js',
      },
    },
    sourcemap: true,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'system.json', dest: '.' },
        { src: 'templates/actor/*.hbs', dest: 'templates/actor' },
        { src: 'templates/chat/*.hbs', dest: 'templates/chat' },
        { src: 'templates/item/*.hbs', dest: 'templates/item' },
        { src: 'styles/*.css', dest: 'styles' },
        { src: 'lang/*.json', dest: 'lang' },
        { src: 'icons/**/*', dest: 'icons' },
      ],
    }),
  ],
});
