

var webpack = require('webpack');
var path = require('path');

var PATHS = {
	src: path.resolve('./client/src'),
	build: path.resolve('./client/dist/')
};

console.log(PATHS.build);

var webpackConfig = {

	//watch: true,

	context: PATHS.src,

	entry: {
		app: [
			'./polyfills.browser.ts',
			'./vendor.browser.ts',
			'./main.browser.ts'
		]
	},


	resolve: {
		root: PATHS.src,
		extensions: ['', '.ts', '.js', '.json']
	},

	output: {
		path: PATHS.build,
		filename: 'scripts.js',
		publicPath: '/bundles/'
	},

	plugins: [
		//new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: [
				'app'
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

	devtool : 'source-map'


};


module.exports = webpackConfig;
