import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // this is needed to make HMR work on WSL
      usePolling: true,
    },
    // needed for the Docker Container port mapping to work
    host: true,
    port: 3000,
  },
});
