import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: true
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
  ...compat.extends(
    "next/core-web-vitals"
  ),
  {
    ignores: [".next/*", "node_modules/*", "dist/*"]
  }
];

export default eslintConfig;