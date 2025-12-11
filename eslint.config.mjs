import nextTypescript from "eslint-config-next/typescript";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [...nextTypescript, ...nextCoreWebVitals, {
  ignores: [".next/*", "node_modules/*", "dist/*", "strapi-cms/*"]
}];

export default eslintConfig;