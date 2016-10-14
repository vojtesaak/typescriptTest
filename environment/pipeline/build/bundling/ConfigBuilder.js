"use strict";

const webpack = require('webpack');
const _ = require('lodash');
const PathProvider = require('../../../utils/PathProvider');
const defaultTemplate = require('./config.template.js');

function ConfigBuilder() {
	this.getNewConfig = function (serviceBluePrint) {
		var configs = [];

		_.forOwn(serviceBluePrint.build.entries, function (config, entryName) {
			let template = _.clone(defaultTemplate);

			template.target = config.target;
			template.entry = createEntryPoints(serviceBluePrint, config, entryName);
			template.output.path = PathProvider.getDistPath(serviceBluePrint.name);
			template.plugins = createPluginsList();

			configs.push(template);
		});

		return configs;
	};
}

function createEntryPoints(blueprint, config, entryName) {
	const entries = {};

	const entryFile = config.entryFile;
	const absolutePath = PathProvider.getSourcePath(blueprint.workspacePath);

	entries[entryName] = PathProvider.join(absolutePath, entryFile);

	return entries;
}

function createPluginsList() {
	return [
		new webpack.optimize.OccurenceOrderPlugin(true)
	];
}

module.exports = new ConfigBuilder();
