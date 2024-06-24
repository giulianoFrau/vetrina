import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "",
  // optimizeDeps: {
  //   include: ["vue-google-maps-community-fork", "fast-deep-equal"],
  // },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [
          `@import "@/assets/scss/vendors/primevue/themes/theme"`,
          `@import "@/assets/scss/mixins/_media-query"`,
          "",
        ].join(";\n"),
      },
    },
  },
  define: {
    "process.env.ES_BUILD": process.env.ES_BUILD,
  },
  plugins: [
    vue({
      // template: {
      //   compilerOptions: {
      //     compatConfig: {
      //       MODE: 2,
      //     },
      //   },
      // },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // vue: "@vue/compat",
    },
  },
});
