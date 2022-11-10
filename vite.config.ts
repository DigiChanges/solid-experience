import { defineConfig } from 'vite';
import solid from 'solid-start/vite';
import legacy from '@vitejs/plugin-legacy';
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
    plugins: [solid({ ssr: false })],
});
