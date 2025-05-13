import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import { flatConfig as pluginNext } from "@next/eslint-plugin-next";
import stylisticPlugin from '@stylistic/eslint-plugin';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

export default defineConfig([
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    'prettier',
  ),
  pluginNext.coreWebVitals,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      js,
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      stylistic: stylisticPlugin,
    },
    settings: {
      react: { version: "detect" },
      "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
      "import/resolver": { typescript: {} },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-console": "off",
      "no-restricted-syntax": [
        "error",
        {
          selector: "CallExpression[callee.object.name='console'][callee.property.name='log']",
          message: "Unexpected console.log statement. Use console.error or console.warn instead.",
        },
      ],
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
          args: "none",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": ["error", { extensions: [".tsx", ".jsx"] }],
      "import/extensions": "off",
      "import/no-unresolved": "off",
      "import/prefer-default-export": "off",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
      "arrow-body-style": "off",
      "no-param-reassign": ["error", { props: false }],
      "no-underscore-dangle": "off",
      "react/function-component-definition": [
        2,
        {
          namedComponents: ["arrow-function", "function-declaration"],
          unnamedComponents: "arrow-function",
        },
      ],
      camelcase: "off",
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
      "max-lines": ["error", { max: 160, skipBlankLines: true, skipComments: true }],
      "max-len": [
        "warn",
        {
          code: 120,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignoreComments: true,
        },
      ],
    },
  },
  {
    ignores: [
      "node_modules/",
      "dist/",
      ".next/",
      "eslint.config.mjs",
      "postcss.config.mjs",
      "*.config.js",
      "*.config.mjs"
    ]
  },
]);