

var webpack = require('webpack');
var path = require('path');

var CLIENT_PATH = path.join(__dirname,'/client/src/');


var webpackConfig = {

	watch: true,

	entry: {
		'polyfills': path.join(CLIENT_PATH, 'polyfills.browser.ts'),
		'vendor':    path.join(CLIENT_PATH, 'vendor.browser.ts'),
		'main':      path.join(CLIENT_PATH, 'main.browser.ts')
	},

	resolve: {
		root: __dirname,
		extensions: ['', '.ts', '.js', '.json']
	},

	output: {
		path: path.join(__dirname, 'dist/public/'),
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
		})
	],

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

module.exports = webpackConfig;
