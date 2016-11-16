const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
const path = require('path');
const fs = require('fs');

function getModules() {
	const nodeModules = {};
	fs.readdirSync('node_modules')
		.filter(function(x) {
			return ['.bin'].indexOf(x) === -1;
		})
		.forEach(function(mod) {
			nodeModules[mod] = 'commonjs ' + mod;
		});

	return nodeModules;
}


module.exports = function() {
	return {
		watch: true,

		entry: [
			'./server/src/app.ts'
		],

		target: 'node',

		output: {
			path: path.join(__dirname, '../server/dist/'),
			filename: 'server-bundle.js'
		},

		resolve: {
			extensions: [ '', '.webpack.js', '.web.js', '.ts', '.js']
		},

		plugins: [
			//new webpack.optimize.UglifyJsPlugin(), add to production
			new webpack.BannerPlugin(
				'require("source-map-support").install();',
				{ raw: true, entryOnly: false }
			),

			new CompressionPlugin({
				asset: '[path].gz[query]',
				algorithm: 'gzip',
				test: /\.js$|\.ts|\.html$/,
				threshold: 10240,
				minRatio: 0.8
			})

		],

		externals: getModules(),

		module: {
			loaders: [
				{
					test: /\.tsx?$/,
					loader: 'ts-loader'
				}
			]
		},

		devtool: 'source-map'
	}
};
