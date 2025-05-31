import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
   base: "/crypto/",
   plugins: [react()],
   server: {
      open: true,
      port: 3000,
   },
   /* Absolute path */
   resolve: {
      alias: {
         "@": resolve(__dirname, "src"),
      },
   },
   css: {
      preprocessorOptions: {
         scss: {
            additionalData: '@import "src/styles/_common.scss";',
         },
      },
   },
});
