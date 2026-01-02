import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
    root: path.resolve(__dirname),
    plugins: [
        react(),
        tsconfigPaths()
    ],
    build: {
        outDir: path.resolve(__dirname, "../../dist/apps/backend/public"),
        emptyOutDir: true,
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },
})