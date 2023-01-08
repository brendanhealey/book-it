import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
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
