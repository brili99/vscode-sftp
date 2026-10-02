import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "no-undef": "off",
      "@typescript-eslint/no-require-imports": "off",
      "no-empty": "off",
      "no-useless-escape": "off",
      "@typescript-eslint/no-this-alias": "off",
      "no-case-declarations": "off",
      "no-async-promise-executor": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "prefer-rest-params": "off",
      "no-useless-assignment": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ]
    },
    ignores: [
      "dist/",
      "node_modules/",
      "test/",
      "webpack.config.js"
    ]
  }
);
