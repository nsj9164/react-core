import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: [["@babel/preset-react", { runtime: "classic" }]],
      },
    }),
  ],
  esbuild: {
    jsxInject: `import React from 'react'`, // JSX 파일마다 자동으로 React import
  },
});
