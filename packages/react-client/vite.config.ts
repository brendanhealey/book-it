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
  // build: {
  //   rollupOptions: {
  //     external: [
  //       "react",
  //       "react-dom",
  //       "react/jsx-runtime",
  //       "prop-types",
  //       "@emotion/react",
  //       "@emotion/styled",
  //       "@mui/lab",
  //       "@mui/joy",
  //       "@mui/icons-material",
  //       "@mui/material",
  //       "@mui/material/styles",
  //       "@mui/material/Slide",
  //       "@mui/styles",
  //     ],
  //     output: {
  //       globals: {
  //         react: "React",
  //         "react-dom": "ReactDOM",
  //         "react/jsx-runtime": "jsxRuntime",
  //       },
  //     },
  //   },
  // },
});
