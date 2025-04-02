import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.base.json", // Asegúrate de que apunta al tsconfig.base.json
    },
  },
  moduleNameMapper: {
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@layouts/(.*)$": "<rootDir>/src/layouts/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
  },
};

export default config;
