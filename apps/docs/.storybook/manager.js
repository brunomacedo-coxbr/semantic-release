import { addons } from "storybook/manager-api";
import { tagBadges } from "./tagBadges";
import Theme from "./theme";

addons.setConfig({
  theme: Theme,
  isFullscreen: false,
  showToolbar: false,
  enableShortcuts: false,
  showTabs: true,
  panelPosition: "bottom",
  tagBadges,
  toolbar: {
    title: { hidden: true },
    zoom: { hidden: true },
    eject: { hidden: true },
    copy: { hidden: true },
    fullscreen: { hidden: true },
    outlines: { hidden: true },
    "storybook/background": { hidden: true },
  },
});
