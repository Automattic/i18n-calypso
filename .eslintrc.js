module.exports = {
	root: true,
	parserOptions: {
		sourceType: "module",
	},
	'extends': [
		'wpcalypso/react',
	],
	parser: 'babel-eslint',
	env: {
		browser: true,
		mocha: true,
		node: true
	},
	globals: {
	},
	plugins: [
	],
	rules: {
		camelcase: 0, // REST API objects include underscores
		'max-len': 0,
	}
};
