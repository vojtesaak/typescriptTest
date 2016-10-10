
const path = require('path');
const helpers = require('./helpers');


const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');


const METADATA = {
	title: 'IBB pack',
	baseUrl: '/'
};

const srcPath = helpers.PATHS.src;


module.exports = function(options) {

	return {

		metadata: METADATA,

		cache: false,

		context: srcPath,

		entry: {
			app: [
				'./polyfills.browser.ts',
				'./vendor.browser.ts',
				'./main.browser.ts'
			]
		},

		output: {
			path: helpers.PATHS.build,
			filename: 'scripts.js',
			publicPath: '/bundles/'
		},

		resolve: {
			root: srcPath,
			extensions: ['', '.ts', '.js', '.json']
			// An array of directory names to be resolved to the current directory
			//modules: [srcPath, 'node_modules']

		},


		module: {

			preLoaders: [
				{
					test: /\.ts$/,
					loader: 'string-replace-loader',
					query: {
						search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
						replace: '$1.import($3).then(mod => (mod.__esModule && mod.default) ? mod.default : mod)',
						flags: 'g'
					},
					include: [srcPath]
				}
			],

			loaders: [
				{
					test: /\.ts$/,
					loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
					include: srcPath,
					exclude: [/\.(spec|e2e)\.ts$/]
				},

				{
					test: /\.json$/,
					loader: 'json-loader'
				},

				{
					test: /\.css$/,
					loaders: ['to-string-loader', 'css-loader']
				},

				{
					test: /\.html$/,
					loader: 'raw-loader',
					exclude: [helpers.PATHS.root.join('server/views/index.html')]
				},
				{
					test: /\.(jpg|png|gif)$/,
					loader: 'file'
				}
			],

			postLoaders: [
				{
					test: /\.js$/,
					loader: 'string-replace-loader',
					query: {
						search: 'var sourceMappingUrl = extractSourceMappingUrl\\(cssText\\);',
						replace: 'var sourceMappingUrl = "";',
						flags: 'g'
					}
				}
			]
		},


		plugins: [

			new ForkCheckerPlugin(),
			new OccurenceOrderPlugin(),
			new CommonsChunkPlugin({
				name: [
					'app'
				],
				minChunks: Infinity
			})

		],


		node: {
			global: 'window',
			crypto: 'empty',
			process: true,
			module: false,
			clearImmediate: false,
			setImmediate: false
		}

	};
};
