/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	settings: {
	},
	plugins: ["@typescript-eslint"],
	extends: [
		"prettier",
		"plugin:prettier/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:astro/recommended",
		"plugin:astro/jsx-a11y-strict",
	],
	rules: {
	},
	ignorePatterns: ['/*.js*', '/*.cjs*'],
	overrides: [
		{
			// Define the configuration for `.astro` file.
			files: ["*.astro"],
			// Allows Astro components to be parsed.
			parser: "astro-eslint-parser",
			// Parse the script in `.astro` as TypeScript by adding the following configuration.
			// It's the setting you need when using TypeScript.
			parserOptions: {
				parser: "@typescript-eslint/parser",
				extraFileExtensions: [".astro"],
			},
			rules: {
				// override/add rules settings here, such as:
				// "astro/no-set-html-directive": "error"
				"@typescript-eslint/no-unused-vars": "off",
				// "no-unused-vars": "error"
			},
		},
	]
};
