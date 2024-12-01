module.exports = {
  extends: ['plugin:prettier/recommended', 'next/core-web-vitals'],
  plugins: ['import'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'react/button-has-type': ['error'],
    'no-console': ['warn'],
    'react/self-closing-comp': ['warn'],
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-fragments': ['warn'],
    'react/jsx-pascal-case': ['error'],
    'react/display-name': ['off'],
    'react/forbid-elements': ['warn', { forbid: ['Image'] }],
    'jsx-a11y/alt-text': [
      'error',
      {
        elements: ['img', 'object', 'area', 'input[type="image"]'],
        img: ['Image', 'CustomImage'],
        object: ['Object'],
        area: ['Area'],
        'input[type="image"]': ['InputImage'],
      },
    ],

    // misc
    'no-console': ['off'],
    'prefer-arrow-callback': ['warn'],
    quotes: ['error', 'single', { avoidEscape: true }],

    // import related
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'internal',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: '~images/**',
            group: 'type',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
      },
    ],
    'import/first': ['warn'],
    'import/newline-after-import': ['warn', { count: 1 }],
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
      },
    ],
  },
  overrides: [
    {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      plugins: ['@typescript-eslint'],
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/consistent-type-imports': [
          'warn',
          {
            prefer: 'type-imports',
          },
        ],
        '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
        '@typescript-eslint/array-type': ['warn', { default: 'array' }],
        '@typescript-eslint/no-empty-function': ['warn'],
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-non-null-assertion': ['off'],

        // typescript typechecking
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: false,
          },
        ],
        '@typescript-eslint/no-unsafe-assignment': ['off'],
        '@typescript-eslint/no-unsafe-call': ['off'],
      },
    },
    {
      env: {
        'jest/globals': true,
      },
      files: ['__test__/**'],
      plugins: ['jest'],
      extends: ['plugin:jest/all'],
    },
  ],
};
