module.exports = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: ["src/**/*.{js,jsx}"],
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    transformIgnorePatterns: ["node_modules/(?!@babel)"],
    globals: {
      "ts-jest": {
        diagnostics: false,
      },
    },
    reporters: ["default"],
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    verbose: true,
    forceExit: true,
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    coveragePathIgnorePatterns: ["/node_modules/", "/dist/", "src/setupTests.js"],
  };
  