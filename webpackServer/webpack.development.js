const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const StartServerPlugin = require('start-server-webpack-plugin').default;

const EventsPlugin = function() {};

EventsPlugin.prototype.apply = function(compiler) {

	compiler.plugin('compilation', ()=> {
		console.log('The compiler is starting a new compilation...');

		console.log(process);
	});

	compiler.plugin('emit', (compilation, callback) => {
		console.log('The compilation is going to emit files...');
		callback();
	});
};


module.exports = function(){

    return webpackMerge(commonConfig(), {

		watch: true,

		plugins: [
			new StartServerPlugin()
		],

    })
};
