import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'index.html'),
                menu: resolve(__dirname, 'menu.html'),
                about: resolve(__dirname, 'about.html'),
                gallery: resolve(__dirname, 'gallery.html'),
                contact: resolve(__dirname, 'contact.html'),
            },
        },
    },
});
