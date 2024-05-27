import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// more config
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["axios"],
    },
  },
});
