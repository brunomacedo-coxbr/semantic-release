import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: [
    "../src/**/*.@(mdx)",
    "../../../packages/ui/src/**/*.@(mdx)",
    "../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "storybook-addon-tag-badges",
  ],
  staticDirs: ["../public"],
  async viteFinal(config, { configType }) {
    return {
      ...config,
      define: { "process.env": {} },
      resolve: {
        alias: [
          {
            find: "ui",
            replacement: "../../../packages/ui/",
          },
        ],
      },
    };
  },
};

export default config;
