import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import * as path from "path";

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ComponentLibrary",
      formats: ["es", "cjs"],
      fileName: "component-lib",
    },
    rollupOptions: {
      watch: {
        include: "src/**",
      },
      // this significantly reduces the size of the .js & .mjs files created in dist
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  resolve: {
    alias: {
      "my-placeholder": path.join(__dirname, "./src"),
    },
  },
});
