import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'vue/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'semi': ['error', 'always'],
    '@stylistic/semi': 'off', // Disable stylistic semicolon rule to avoid conflicts
    'vue/multi-word-component-names': 'off', // Disable multi-word component names for pages
    'vue/singleline-html-element-content-newline': 'off', // Disable single line HTML element content newline rule
  },
});
