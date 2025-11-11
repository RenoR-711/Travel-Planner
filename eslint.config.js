// eslint.config.js
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import sonarjs from "eslint-plugin-sonarjs";
import prettier from "eslint-config-prettier";

/** @type {import("eslint").FlatConfig.ConfigArray} */
export default [
  // Basis-Configs von ESLint und Prettier
  js.configs.recommended,
  prettier,

  {
    files: ["**/*.{ts,tsx,js,jsx}"],

    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },

    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      sonarjs
    },

    settings: {
      react: { version: "detect" }
    },

    rules: {
      /* ----------------------------------- */
      /* ✅ TypeScript: saubere Defaults     */
      /* ----------------------------------- */
      "@typescript-eslint/consistent-type-definitions": "off", // erlaubt "type" und "interface"
      "@typescript-eslint/prefer-readonly": "warn", // Props nur Empfehlung, kein Fehler
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],

      //  hilfreiche TypeScript-Tipps (statt Total TypeScript von Matt Pacock)
      "@typescript-eslint/array-type": ["warn", { default: "array-simple" }], //Erzwingt eine einheitliche Array-Schreibweise (string[] statt Array<string>)
      "@typescript-eslint/consistent-type-imports": "warn", //Erzwingt die neue, empfohlene Syntax import type { MyType } from "./types";
      "@typescript-eslint/no-inferrable-types": "off", //Unterdrückt unnötige Warnungen, wenn TypeScript einen Typ ohnehin erkennt
      "@typescript-eslint/no-unnecessary-type-assertion": "warn", //Warnt, wenn ein as-Cast überflüssig ist (z. B. as string obwohl TS das schon weiß)
      "@typescript-eslint/prefer-optional-chain": "warn", //Schlägt obj?.prop statt obj && obj.prop vor
      "@typescript-eslint/prefer-nullish-coalescing": "warn", //Schlägt ?? statt `

      /* ----------------------------------- */
      /* ✅ React & Hooks                    */
      /* ----------------------------------- */
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /* ----------------------------------- */
      /* ✅ Accessibility (a11y)             */
      /* ----------------------------------- */
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",

      /* ----------------------------------- */
      /* ✅ SonarJS Code Quality              */
      /* ----------------------------------- */
      "sonarjs/no-duplicate-string": "off", // weniger streng
      "sonarjs/cognitive-complexity": ["warn", 20],

      /* ----------------------------------- */
      /* ✅ Allgemeine Code-Stilregeln       */
      /* ----------------------------------- */
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": "off", // durch TS ersetzt
      "no-undef": "off" // TypeScript erledigt das bereits
    }
  }
];
