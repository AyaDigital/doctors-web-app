/* eslint-env node */
module.exports = {
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	overrides: [
		{
			files: ['**/*.cjs'],
			env: {
				node: true,
			},
		},
	],
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	rules: {
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/no-empty-function': ["error", {"allow": ["arrowFunctions"]}],
		'@typescript-eslint/no-non-null-assertion': 'off'
	},
	root: true,
  };
