var webpack = require('webpack');

module.exports = {
	entry: './server/server.ts',
	output: {
		filename: "./dist/server/server.js"
	},
	resolve: {
		extensions: [ '.ts', '.js', '' ]
	},
	module: {
		loaders: [
			{test: /\.tsx?$/, loader: 'ts-loader' }
		]
	},

	devtool: 'source-map'
};
