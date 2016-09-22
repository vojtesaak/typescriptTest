var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: path.join(__dirname, '/server/server.ts'),
	output: {
		filename: path.join(__dirname, '/server/dist/server.js')
	},
	resolve: {
		extensions: [ '.ts', '.js', '']
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	],
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
