import js from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import pluginReact from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import importPlugin from "eslint-plugin-import"
import prettierPlugin from "eslint-plugin-prettier"
import globals from "globals"

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        NodeJS: "readonly",
        $: "readonly",
        jQuery: "readonly",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    settings: { react: { version: "detect" } },
    rules: {
      quotes: ["error", "double", { avoidEscape: true }],
      semi: ["error", "never"],
      "object-curly-spacing": ["error", "always"],
      "comma-dangle": ["error", "only-multiline"],
      "max-len": ["error", { code: 120, ignoreUrls: true, ignoreComments: true }],
      eqeqeq: ["error", "always"],
      "no-undef": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-empty-function": ["error", { allow: ["arrowFunctions"] }],
      "no-unreachable": "error",
      "linebreak-style": ["error", "unix"], // LF
      "no-var": "error",
      "prefer-const": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-key": "error",
      "react/jsx-no-useless-fragment": "warn",
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "prettier/prettier": ["error", { endOfLine: "lf" }],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "prettier/prettier": ["error", { endOfLine: "lf" }],
    },
  },
]
