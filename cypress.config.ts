import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    env: {
      apiUrl: process.env.VITE_API_URL || "http://localhost:4000",
    },
    setupNodeEvents(on, config) {},
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    supportFile: "cypress/support/component.ts",
  },
});
