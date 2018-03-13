module.exports = {
	entry: __dirname + '/index.js',

	output: {
		path: __dirname + '/build',
		filename: 'index.js',
		library: 'i18n',
		libraryTarget: 'var',
	},

	resolve: {
		extensions: [ '.json', '.js', '.jsx' ],
	},

	externals: [
		'moment-timezone',
	],

	devtool: 'sourcemap',
};
