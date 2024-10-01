import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      port: 8080,
    },

    resolve: {
      alias: {
        src: "/src",
        components: "/src/components",
        assets: "/src/assets",
        apis: "/src/apis",
        styles: "/src/styles",
      },
    },
    plugins: [react()],
  });
};
