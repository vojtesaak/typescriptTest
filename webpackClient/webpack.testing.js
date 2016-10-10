

const helpers = require('./helpers');

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');


const ENV = process.env.ENV = process.env.NODE_ENV = 'test';


module.exports = function(options) {
	return {


		devtool: 'inline-source-map',


		module: {


			preLoaders: [

				{
					test: /\.ts$/,
					loader: 'tslint-loader',
					exclude: [helpers.PATHS.root.join('node_modules')]
				},

				{
					test: /\.js$/,
					loader: 'source-map-loader',
					exclude: [
						// these packages have problems with their sourcemaps
						helpers.PATHS.root.join('node_modules/rxjs'),
						helpers.PATHS.root.join('node_modules/@angular')
					]}

			],

			loaders: [

				{
					test: /\.ts$/,
					loader: 'awesome-typescript-loader',
					query: {
						// use inline sourcemaps for "karma-remap-coverage" reporter
						sourceMap: false,
						inlineSourceMap: true,
						compilerOptions: {
							// Remove TypeScript helpers to be injected
							// below by DefinePlugin
							removeComments: true
						}
					},
					exclude: [/\.e2e\.ts$/]
				},

				{
					test: /\.json$/,
					loader: 'json-loader',
					exclude: [helpers.PATHS.root.join('server/views/index.html')]
				},

				{
					test: /\.css$/,
					loaders: ['to-string-loader', 'css-loader'],
					exclude: [helpers.PATHS.root.join('server/views/index.html')] },

				{
					test: /\.html$/,
					loader: 'raw-loader',
					exclude: [helpers.PATHS.root.join('server/views/index.html')]
				}

			],

			postLoaders: [

				{
					test: /\.(js|ts)$/,
					loader: 'istanbul-instrumenter-loader',
					include: helpers.PATHS.src,
					exclude: [
						/\.(e2e|spec)\.ts$/,
						/node_modules/
					]
				}

			]
		},


		plugins: [

			new DefinePlugin({
				'ENV': JSON.stringify(ENV),
				'HMR': false,
				'process.env': {
					'ENV': JSON.stringify(ENV),
					'NODE_ENV': JSON.stringify(ENV),
					'HMR': false
				}
			})

		],


		tslint: {
			emitErrors: false,
			failOnHint: false,
			resourcePath: 'src'
		},


		node: {
			global: 'window',
			process: false,
			crypto: 'empty',
			module: false,
			clearImmediate: false,
			setImmediate: false
		}

	};
};
