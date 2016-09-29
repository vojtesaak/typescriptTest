var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

function getModules() {
	var nodeModules = {};
	fs.readdirSync('node_modules')
		.filter(function(x) {
			return ['.bin'].indexOf(x) === -1;
		})
		.forEach(function(mod) {
			nodeModules[mod] = 'commonjs ' + mod;
		});

	return nodeModules;
}


module.exports = {
	entry: [ path.join(__dirname, '/server/src/server.ts') ],
	target: 'node',
	output: {
		path: path.join(__dirname, '/server/dist/'),
		filename: 'server-bundle.js'
	},
	resolve: {
		extensions: [ '', '.webpack.js', '.web.js', '.ts', '.js']
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.BannerPlugin(
			'require("source-map-support").install();',
			{ raw: true, entryOnly: false }
			)
	],
	externals: getModules() ,
	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			}
		]
	},
	devtool: 'source-map'
};
