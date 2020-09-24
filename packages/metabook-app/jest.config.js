module.exports = {
  setupFiles: ["./src/util/__tests__/mockLeveldown.ts"],
  testEnvironment: "jest-environment-uint8array",
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  testPathIgnorePatterns: ["dist", "node_modules"],
  transformIgnorePatterns: [],
  transform: {
    "\\.[jt]s$": ["babel-jest", { cwd: __dirname }],
  },
  preset: "react-native",
  // Jest struggles to read these mappings from the multiformats packages, which seem to be specifying them just fine as far as I can tell.
  moduleNameMapper: {
    "^multiformats$": "multiformats/cjs/src/index.js",
    "^multiformats/(.+)$": "multiformats/cjs/src/$1.js",
    "^@ipld/dag-json": "@ipld/dag-json/cjs/index.js",
  },
};
