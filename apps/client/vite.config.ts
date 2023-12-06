import { defineConfig } from "vite";
import React from "@vitejs/plugin-react-swc";
import UnoCSS from "unocss/vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [React(), UnoCSS()],
  server: {
    cors: true
  },
  define: {
    "process.env.IS_PREACT": JSON.stringify("true")
  }
});
