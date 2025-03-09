import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: [["@babel/preset-react", { runtime: "classic" }]],
        plugins: [
          [
            "@babel/plugin-transform-react-jsx",
            {
              runtime: "classic",
              pragma: "createElement",
              pragmaFrag: "Fragment",
            },
          ],
        ],
      },
    }),
  ],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
