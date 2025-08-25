import { create } from "storybook/theming/create";
import { version } from "../../../packages/ui/package.json";

export default create({
  base: "light",
  brandTitle: `Design System v${version}`,
  brandUrl: "./",

  // Typography
  fontBase: "Open Sans, sans-serif",
  fontCode: "monospace",

  colorPrimary: "#373939",
  colorSecondary: "#1F3E74",
});
