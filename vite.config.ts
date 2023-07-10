import solid from 'solid-start/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        solid()
    ],
    build: {
        target: 'esnext'
    },
    ssr: {
    noExternal: ["@kobalte/core"]
  }
});
