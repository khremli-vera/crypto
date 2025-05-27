import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginImport from "eslint-plugin-import";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import js from "@eslint/js";
import path from "path";

const compat = new FlatCompat({
   baseDirectory: path.resolve(),
});

export default [
   ...compat.config({
      extends: [
         "eslint:recommended",
         "plugin:@typescript-eslint/recommended",
         "plugin:react-hooks/recommended",
         "plugin:storybook/recommended",
      ],
      ignorePatterns: ["dist", ".eslintrc.cjs"],
      plugins: {
         "react-refresh": pluginReactRefresh,
         import: pluginImport,
      },
   }),
   {
      files: ["**/*.ts", "**/*.tsx"],
      languageOptions: {
         parser: tseslint.parser,
         parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            project: "./tsconfig.json",
         },
      },
      plugins: {
         "@typescript-eslint": tseslint.plugin,
      },
      rules: {
         "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
         ],
         "@typescript-eslint/no-unused-vars": "warn",
         "@typescript-eslint/naming-convention": [
            "error",
            {
               selector: "interface",
               format: ["PascalCase"],
               custom: {
                  regex: "^I[A-Z]",
                  match: true,
               },
            },
         ],
         "no-console": ["warn", { allow: ["warn", "error"] }],
         "sort-imports": [
            "error",
            { ignoreCase: true, ignoreDeclarationSort: true },
         ],
         "import/order": [
            "error",
            {
               groups: [
                  ["external", "builtin"],
                  "internal",
                  ["sibling", "parent", "index"],
                  "unknown",
               ],
               pathGroups: [
                  {
                     pattern: "react*",
                     group: "external",
                     position: "before",
                  },
                  {
                     pattern: "@/pages/**",
                     group: "internal",
                  },
                  {
                     pattern: "@/components/**",
                     group: "internal",
                  },
                  {
                     pattern: "@/**",
                     group: "internal",
                     position: "after",
                  },
                  {
                     pattern: "./*.module.scss",
                     group: "unknown",
                     position: "after",
                  },
                  {
                     pattern: "./**",
                     group: "index",
                  },
               ],
               pathGroupsExcludedImportTypes: ["builtin"],
               alphabetize: { order: "asc", caseInsensitive: true },
               "newlines-between": "always",
            },
         ],
      },
   },
];
