/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  globals: {
    // This is necessary because next.js forces { "jsx": "preserve" }, but ts-jest appears to require { "jsx": "react" }
    "ts-jest": {
      tsconfig: {
        jsx: "react-jsx",
      },
    },
  },
};
