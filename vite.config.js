import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      { find: "@pages", replacement: path.resolve(__dirname, "./src/pages") },
      { find: "@components", replacement: path.resolve(__dirname, "./src/components") },
      { find: "@server", replacement: path.resolve(__dirname, "./src/server") },
      { find: "@toastify", replacement: path.resolve(__dirname, "./src/utils/toastify.js") },
      { find: "@modals", replacement: path.resolve(__dirname, "./src/components/modals") },
    ],
  },
});
