

var webpack = require('webpack');
var path = require('path');
var config = require('./server/src/config');


var PATHS = {
	src: path.resolve('./client/src'),
	build: path.resolve('./client/dist/')
};

console.log(PATHS.build);

var webpackConfig = {

	cache: true,

	watch: true,

	context: PATHS.src,

	entry: {
		'webpackDevServer': 'webpack-dev-server/client?http://localhost:' + config.port,
		'webpackHotReload': 'webpack/hot/dev-server',

		'polyfills':  './polyfills.browser.ts',
		'vendor':    './vendor.browser.ts',
		'main':      './main.browser.ts'
	},


	resolve: {
		root: PATHS.src,
		extensions: ['', '.ts', '.js', '.json']
	},

	output: {
		path: PATHS.build,
		filename: '[name].bundle.js',
		sourceMapFilename: '[name].js.map',
		chunkFilename: '[id].chunk.js'
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.optimize.CommonsChunkPlugin({
			name: [
				'main',
				'vendor',
				'polyfills'
			],
			minChunks: Infinity
		}),
		new webpack.HotModuleReplacementPlugin()
	],

	module: {
		loaders: [
			// .ts files for TypeScript
			{
				test: /\.ts$/,
				loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
				include: PATHS.src
			},
			{
				test: /\.css$/,
				loaders: ['to-string-loader', 'css-loader']
			},
			{ test: /\.html$/, loader: 'raw-loader' },
			{ test: /\.json$/, loader: 'json-loader' }
		]
	},

	devServer: {
		hot: true,
		contentBase: './client/public/assets'
	}

};


module.exports = webpackConfig;
