
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');




module.exports = function(options) {

	const ENV = options.env;
	const HOST = process.env.HOST || 'localhost';
	const PORT = process.env.PORT || 3000;
	const HMR = helpers.hasProcessFlag('hot');

	const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
		host: HOST,
		port: PORT,
		ENV: ENV,
		HMR: HMR
	});

	return webpackMerge(commonConfig({env: ENV}), {

		metadata: METADATA,

		debug: true,

		devtool: 'cheap-module-source-map',

		plugins: [

			new DefinePlugin({
				'ENV': JSON.stringify(METADATA.ENV),
				'HMR': METADATA.HMR,
				'process.env': {
					'ENV': JSON.stringify(METADATA.ENV),
					'NODE_ENV': JSON.stringify(METADATA.ENV),
					'HMR': METADATA.HMR
				}
			}),
			new HotModuleReplacementPlugin()

		],


		tslint: {
			emitErrors: false,
			failOnHint: false,
			resourcePath: 'src'
		},


		node: {
			global: 'window',
			crypto: 'empty',
			process: true,
			module: false,
			clearImmediate: false,
			setImmediate: false
		}

	});
};
