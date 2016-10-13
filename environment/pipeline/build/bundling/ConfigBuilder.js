"use strict";

var webpack = require('webpack');
var _ = require('lodash');
var PathProvider = require('../../../utils/PathProvider');
var defaultTemplate = require('./config.template.js');

function ConfigBuilder() {
	this.getNewConfig = function (service) {
		const serviceName = service.getServiceName();

		let template = _.clone(defaultTemplate);

		template.entry = createEntryPoint(service);
		template.output.path = PathProvider.getDistPath(serviceName);
		template.plugins = createPluginsList(serviceName);

		return template;
	};
}

function createEntryPoint(service) {
	const entryFile = service.getEntryFile();
	const absolutePath = PathProvider.getSourcePath(service.getWorkspacePath());

	const entries = {
		[service.getServiceName()]: PathProvider.join(absolutePath, entryFile)
	};

	return entries;
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

module.exports = new ConfigBuilder();
