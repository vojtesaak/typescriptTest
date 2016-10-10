const webpack = require('webpack');

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
			)
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
