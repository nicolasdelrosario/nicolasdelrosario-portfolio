import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig({
  globals: {
    ...globals.browser,
  },
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginPrettierRecommended.configs.recommended.browser,
});
