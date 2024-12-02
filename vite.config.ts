import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
    const isDocs = mode === 'docs';

    return {
        plugins: [
            vue(),
            viteTsconfigPaths(),
            Components({
                resolvers: [AntDesignVueResolver()],
                dirs: ['src/components'],
                extensions: ['vue'],
                include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
                dts: !isDocs,
            }),
            ...(isDocs ? [] : [dts({ include: ['src/**/*.ts', 'src/**/*.vue'], insertTypesEntry: true })]),
        ],

        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '@components': fileURLToPath(new URL('./src/components', import.meta.url)), // Ajuste para produção
                '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
                '@mixins': fileURLToPath(new URL('./src/mixins', import.meta.url)),
                '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
                '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
            },
        },

        server: {
            host: true,
            port: 4173,
        },

        build: isDocs
            ? {
                  outDir: 'dist',
                  rollupOptions: {
                      input: 'index.html',
                  },
              }
            : {
                  lib: {
                      entry: 'src/index.ts',
                      name: 'CmmvUI',
                      fileName: (format) => `cmmv-ui.${format}.js`,
                      formats: ['es', 'cjs'],
                  },
                  rollupOptions: {
                      external: ['vue'],
                      output: {
                          globals: {
                              vue: 'Vue',
                          },
                      },
                  },
                  cssCodeSplit: true,
              },
    };
});
