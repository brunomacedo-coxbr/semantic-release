import { type ChangeEvent, useState, useEffect } from "react";
import { type Preview } from "@storybook/react-vite";

import Template from "../src/Template.mdx";

import "@design-system/ui/styles.css";
import "@design-system/tailwind-config/styles.css";

export const parameters: Preview["parameters"] = {
  a11y: {
    // Optional selector to inspect
    context: ".theme-body-preview",
    config: {
      rules: [
        {
          // The autocomplete rule will not run based on the CSS selector provided
          id: "autocomplete-valid",
          selector: '*:not([autocomplete="nope"])',
        },
        {
          // Setting the enabled option to false will disable checks for this particular rule on all stories.
          id: "image-alt",
          enabled: false,
        },
      ],
    },
    options: {},
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewMode: "docs",
  docs: {
    page: Template,
    toc: {
      headingSelector: "h2",
    },
    canvas: {
      sourceState: "none",
      withToolbar: false,
    },
  },
  options: {
    storySort: {
      order: [
        "Welcome",
        "Changelog",
        "Guides",
        ["Getting Started", "Contributing", "*"],
        "Developer Setup",
        ["CLI", "*"],
        "Foundations",
        "*",
      ],
    },
  },
};

export const decorators = [
  (Story) => {
    const [selectedTheme, setSelectedTheme] = useState("theme-default");

    useEffect(() => {
      const savedTheme = localStorage.getItem("selectedTheme");
      if (savedTheme) {
        setSelectedTheme(savedTheme);
        const element = document.querySelector(".sb-show-main");
        if (element) {
          element.classList.add(savedTheme);
        }
      }
    }, []);

    const toggleDarkMode = () => {
      const element = document.querySelector(".sb-show-main");
      if (element) {
        element.classList.toggle("theme-dark-mode");
      }
    };

    const changeTheme = (event: ChangeEvent<HTMLSelectElement>) => {
      const element = document.querySelector(".sb-show-main");
      const newTheme = event.target.value;
      setSelectedTheme(newTheme);
      localStorage.setItem("selectedTheme", newTheme);

      if (element) {
        element.classList.remove(
          "theme-default",
          "theme-dt",
          "theme-kbb",
          "theme-manheim",
        );
        element.classList.add(newTheme);
      }
    };

    return (
      <div id="decorator-demo-preview">
        <div className="theme-toolbar">
          <select
            title="Select Theme"
            className="theme-select"
            value={selectedTheme}
            onChange={changeTheme}
          >
            <option value="theme-default">Default</option>
            <option value="theme-dt">DT</option>
            <option value="theme-kbb">KBB</option>
            <option value="theme-manheim">Manheim</option>
          </select>

          <button
            className="theme-button"
            title="Toggle Dark Mode"
            onClick={toggleDarkMode}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2V4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
              <path
                d="M12 20V22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
              <path
                d="M4.22 4.22L5.64 5.64"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
              <path
                d="M18.36 18.36L19.78 19.78"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
              <path
                d="M1 12H3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
              <path
                d="M21 12H23"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
              <path
                d="M4.22 19.78L5.64 18.36"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
              <path
                d="M18.36 5.64L19.78 4.22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
              <circle
                cx="12"
                cy="12"
                r="5"
                stroke="currentColor"
                strokeWidth="2"
              ></circle>
            </svg>
          </button>
        </div>
        <div className="theme-body-preview">
          <Story />
        </div>
      </div>
    );
  },
];

export const tags = ["autodocs"];
