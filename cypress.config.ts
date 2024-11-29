import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001", // Adjust to match your app's dev server URL
    supportFile: "cypress/support/e2e.ts", // Ensure this file exists
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    supportFile: "cypress/support/component.ts", // Ensure this file exists
    indexHtmlFile: "cypress/support/component-index.html", // Required for mounting React components
  },
});
