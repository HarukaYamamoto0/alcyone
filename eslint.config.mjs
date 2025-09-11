import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['**/.*', '**/*.json', 'dist/', 'build/', 'node_modules/']),
  {
    extends: [...compat.extends('eslint:recommended'), ...tsEslint.configs.recommended, prettier],

    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      'no-console': 'off', // TODO: enable this rule after creating the log system
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-empty': 'warn',
      'no-empty-function': 'warn',
      'no-extra-semi': 'error',
      'no-irregular-whitespace': 'error',
      'no-unreachable': 'error',
      'no-unused-expressions': 'error',
      'no-useless-escape': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-return-await': 'error',
      'require-await': 'error',
      'no-shadow': 'error',
      eqeqeq: ['error', 'smart'],

      'sort-vars': ['warn', { ignoreCase: true }],

      'max-len': [
        'warn',
        {
          code: 120,
          tabWidth: 2,
          ignoreUrls: true,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      yoda: 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-non-null-assertion': 'warn',
    },
  },
]);
