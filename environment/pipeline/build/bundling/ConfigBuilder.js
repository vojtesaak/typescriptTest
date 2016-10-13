"use strict";

var webpack = require('webpack');
var _ = require('lodash');
var PathProvider = require('../../../utils/PathProvider');
var defaultTemplate = require('./config.template.js');

var ConfigBuilder = {
	getNewConfig: function(AppName, appPath, entryFile) {
		const absolutePath = PathProvider.getAppPath(appPath);
		let template = _.clone(defaultTemplate);

		template.entry = createEntryPoint(AppName, PathProvider.join(absolutePath, entryFile));
		template.output.path = PathProvider.getDistPath(AppName);
		template.plugins = createPluginsList(AppName);

		return template;
	}
};

function createEntryPoint(AppName, absolutePath) {
	return {
		[AppName]: absolutePath
	};
}

function createPluginsList(AppName) {
	return [
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.optimize.CommonsChunkPlugin({
			name: [
				AppName
			],
			minChunks: Infinity
		})
	];
}

Object.freeze(ConfigBuilder);

module.exports = ConfigBuilder;
