import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testMatch: ["**/src/**/*.test.tsx", "**/src/**/*.test.ts"],
  testEnvironment: "jsdom",
};

export default config;
