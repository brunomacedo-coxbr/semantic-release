import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: [
    "src/**/*.{ts,tsx}",
    "src/index.ts",
    "!src/**/*.stories.{ts,tsx,js,jsx}",
    "!src/**/*.test.{ts,tsx,js,jsx}",
    "!**/setupTests.{ts,tsx,js,jsx}",
  ],
  format: ["cjs", "esm"],
  dts: true,
  external: ["react", "react-dom"],
  ...options,
}));
