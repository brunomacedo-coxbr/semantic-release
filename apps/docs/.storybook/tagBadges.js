import { defaultConfig } from "storybook-addon-tag-badges";

/**
 * Storybook Addon Tag Badges
 * https://github.com/Sidnioulz/storybook-addon-tag-badges?tab=readme-ov-file
 * stable, new, alpha, beta, experimental, deprecated, outdated, danger, code-only, version:*
 */
export const tagBadges = [
  {
    tags: "stable",
    badge: {
      text: "Stable",
      bgColor: "#2C8A1D",
      fgColor: "#FFFFFF",
      tooltip: "This component is stable and production-ready.",
    },
    display: {
      sidebar: ["component"],
      toolbar: false,
    },
  },
  {
    tags: { prefix: "version" },
    badge: ({ entry, getTagSuffix, tag }) => {
      const version = getTagSuffix(tag);
      const isUnstable = version.startsWith("0");
      return {
        text: `v${version}`,
        bgColor: version.startsWith("0") ? "#F0CCFF" : "#CCE0FF",
        tooltip: `Version ${version}${isUnstable ? " (unstable)" : ""}`,
      };
    },
  },
  // Place the default config after your custom matchers.
  ...defaultConfig,
];
