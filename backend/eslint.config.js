// eslint.config.js
import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import globals from 'globals'

export default [
  // Базовые recommended правила
  js.configs.recommended,

  // Отключаем правила, которые конфликтуют с Prettier
  prettierConfig,

  // Основные правила для JavaScript файлов
  {
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin
    },

    files: ['**/*.js'],

    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.nodeBuiltin,
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        setImmediate: 'readonly',
        clearImmediate: 'readonly'
      }
    },

    rules: {
      // === БАЗОВЫЕ ПРАВИЛА ===
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': 'error',

      // === СТИЛИСТИЧЕСКИЕ ПРАВИЛА ===
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'never'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'comma-dangle': ['error', 'never'],
      'arrow-spacing': 'error',
      'brace-style': ['error', '1tbs'],
      curly: ['error', 'multi-line'],

      // === ПРАВИЛА ДЛЯ ИМПОРТОВ (ESM) ===
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],
      'import/no-unresolved': 'error',
      'import/no-duplicates': 'error',
      'import/extensions': 'off',

      // === ПРАВИЛА ДЛЯ NODE.JS ===
      'prefer-const': 'error',
      'no-var': 'error',
      'prefer-arrow-callback': 'error',
      'no-buffer-constructor': 'error',

      // === ASYNC/AWAIT ПРАВИЛА ===
      'require-await': 'warn',
      'no-return-await': 'error',
      'prefer-promise-reject-errors': 'error',

      // === Prettier интеграция ===
      'prettier/prettier': 'error'
    }
  },

  // Правила для тестовых файлов
  {
    files: ['**/*.test.js', '**/__tests__/**/*.js', '**/test/**/*.js'],
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off',
      'require-await': 'off'
    }
  },

  // Правила для конфигурационных файлов
  {
    files: ['**/config/**/*.js', '**/*.config.js'],
    rules: {
      'no-console': 'off'
    }
  },

  // Игнорируемые файлы и директории
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      'logs/',
      'uploads/',
      'temp/',
      '*.min.js',
      'migrations/',
      'seeders/',
      '**/.*' // скрытые файлы
    ]
  }
];
