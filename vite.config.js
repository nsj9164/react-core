import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: [
          [
            "@babel/preset-react",
            { runtime: "automatic", importSource: "../lib" },
          ],
        ],
      },
    }),
  ],
});
