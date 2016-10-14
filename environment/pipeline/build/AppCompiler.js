"use strict";

const ServiceCompiler = require('./ServiceCompiler');
const _ = require('lodash');
const Bluebird = require('bluebird');

function AppCompiler (app) {
	this.compileAndWatch = function() {
		return Bluebird.map(app.getServiceBlueprints(), function(serviceBP) {
			var serviceCompiler = new ServiceCompiler(serviceBP);

			return serviceCompiler.compileAndWatch();
		});
	};
}

module.exports = AppCompiler;
