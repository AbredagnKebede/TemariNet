module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier"
    ],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn"
    }
  };