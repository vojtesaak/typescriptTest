

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');


const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
	host: HOST,
	port: PORT,
	ENV: ENV,
	HMR: false
});

module.exports = function(env) {
	return webpackMerge(commonConfig({env: ENV}), {

		debug: false,

		devtool: 'source-map',

		plugins: [


			new WebpackMd5Hash(),

			new DedupePlugin(),


			// NOTE: when adding more properties make sure you include them in custom-typings.d.ts
			new DefinePlugin({
				'ENV': JSON.stringify(METADATA.ENV),
				'HMR': METADATA.HMR,
				'process.env': {
					'ENV': JSON.stringify(METADATA.ENV),
					'NODE_ENV': JSON.stringify(METADATA.ENV),
					'HMR': METADATA.HMR
				}
			}),


			// NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
			new UglifyJsPlugin({
				// beautify: true, //debug
				// mangle: false, //debug
				// dead_code: false, //debug
				// unused: false, //debug
				// deadCode: false, //debug
				// compress: {
				//   screw_ie8: true,
				//   keep_fnames: true,
				//   drop_debugger: false,
				//   dead_code: false,
				//   unused: false
				// }, // debug
				// comments: true, //debug


				beautify: false, //prod
				mangle: { screw_ie8 : true, keep_fnames: true }, //prod
				compress: { screw_ie8: true }, //prod
				comments: false //prod
			}),


			new NormalModuleReplacementPlugin(
				/angular2-hmr/,
				helpers.root('config/modules/angular2-hmr-prod.js')
			)


		],
/*
		tslint: {
			emitErrors: true,
			failOnHint: true,
			resourcePath: 'src'
		},
*/


		node: {
			global: 'window',
			crypto: 'empty',
			process: false,
			module: false,
			clearImmediate: false,
			setImmediate: false
		}

	});
};
