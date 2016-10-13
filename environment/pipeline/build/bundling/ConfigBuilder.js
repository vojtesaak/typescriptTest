"use strict";

var webpack = require('webpack');
var _ = require('lodash');
var PathProvider = require('../../../utils/PathProvider');
var defaultTemplate = require('./config.template.js');

var ConfigBuilder = {
	getNewConfig: function(serviceName, workspaceLoc, entryFile) {
		const absolutePath = PathProvider.getSourcePath(workspaceLoc);
		let template = _.clone(defaultTemplate);

		template.entry = createEntryPoint(serviceName, PathProvider.join(absolutePath, entryFile));
		template.output.path = PathProvider.getDistPath(serviceName);
		template.plugins = createPluginsList(serviceName);

		return template;
	}
};

function createEntryPoint(ServiceName, absolutePath) {
	return {
		[ServiceName]: absolutePath
	};
}

function createPluginsList(ServiceName) {
	return [
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.optimize.CommonsChunkPlugin({
			name: [
				ServiceName
			],
			minChunks: Infinity
		})
	];
}

Object.freeze(ConfigBuilder);

module.exports = ConfigBuilder;
