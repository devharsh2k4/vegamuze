import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ),
  {
    rules: {
      // Enforce consistent React imports
      "react/react-in-jsx-scope": "off",
      // Prevent unused variables
      "@typescript-eslint/no-unused-vars": ["error"],
      // Ensure proper return types
      "@typescript-eslint/explicit-function-return-type": "off",
      // Enforce consistent spacing
      "no-trailing-spaces": "error",
      // Enforce consistent quotes
      "quotes": ["error", "single"],
      // Prevent console logs in production
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn"
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];

export default eslintConfig;
