var webpack = require('webpack');
var PathProvider = require('../../../utils/PathProvider');

// Webpack Config
var webpackConfig = {
	/**
	 * Is filled by config builder
     */
	entry: {},
	/**
	 * Is filled by config builder
	 */
	output: {
		fileName: "[name].entry.js"
	},
	/**
	 * Is filled by config builder
	 */
	plugins: [],
	/**
	 * Common file loaders
     */
	module: {
		loaders: [
			// .ts files for TypeScript
			{ test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
			{ test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
			{ test: /\.html$/, loader: 'raw-loader' },
			{ test: /\.json$/, loader: 'json-loader' }
		]
	}
};
// Our Webpack Defaults
var defaultConfig = {
	devtool: 'source-map',
	cache: false,
	debug: true,
	context: __dirname,
	output: {
		filename: '[name].bundle.js',
		sourceMapFilename: '[name].map',
		chunkFilename: '[id].chunk.js'
	},

	resolve: {
		root: __dirname,
		extensions: ['', '.ts', '.js', '.json']
	},

	devServer: {
		//contentBase: 'src/public',
		//publicPath: '/__build__',
		historyApiFallback: true,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		}
	},
    //
	// node: {
	// 	global: 1,
	// 	crypto: 'empty',
	// 	module: 0,
	// 	Buffer: 0,
	// 	clearImmediate: 0,
	// 	setImmediate: 0
	// }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
