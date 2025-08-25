import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import pluginReactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import { config as baseConfig } from "./base.js";

import airbnbBestPractices from "eslint-config-airbnb-base/rules/best-practices";
import airbnbErrors from "eslint-config-airbnb-base/rules/errors";
import airbnbNode from "eslint-config-airbnb-base/rules/node";
import airbnbStyle from "eslint-config-airbnb-base/rules/style";
import airbnbVariables from "eslint-config-airbnb-base/rules/variables";
import airbnbEs6 from "eslint-config-airbnb-base/rules/es6";
import airbnbStrict from "eslint-config-airbnb-base/rules/strict";

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config} */
export const config = [
  eslintConfigPrettier,
  ...baseConfig,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
    },
  },
  {
    plugins: {
      prettier: eslintPluginPrettier,
      "react-hooks": pluginReactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...airbnbBestPractices.rules,
      ...airbnbErrors.rules,
      ...airbnbNode.rules,
      ...airbnbStyle.rules,
      ...airbnbVariables.rules,
      ...airbnbEs6.rules,
      ...airbnbStrict.rules,
      indent: "off",
      quotes: [
        "error",
        "double",
        {
          allowTemplateLiterals: true,
        },
      ],
      "operator-linebreak": "off",
      "object-curly-newline": [
        "error",
        {
          multiline: true,
          consistent: true,
        },
      ],
      "function-paren-newline": "off",
      "prettier/prettier": [
        "error",
        {
          jsxBracketSameLine: false,
          singleQuote: false,
          tabWidth: 2,
          useTabs: false,
        },
      ],
      "react/jsx-curly-brace-presence": [
        "error",
        {
          props: "never",
          children: "ignore",
        },
      ],
      "no-warning-comments": [
        "warn",
        {
          terms: ["eslint-disable-next-line", "eslint-disable"],
          location: "anywhere",
        },
      ],
      "import/no-extraneous-dependencies": "off",
      "import/prefer-default-export": "off",
      "import/no-default-export": "off",
      "react/react-in-jsx-scope": "off",
      "jsx-quotes": ["error", "prefer-double"],
      "implicit-arrow-linebreak": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": [
        "warn",
        {
          ignoreRestArgs: false,
        },
      ],
    },
  },
];
