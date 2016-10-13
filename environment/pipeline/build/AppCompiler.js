"use strict";

const ServiceCompiler = require('./ServiceCompiler');
const _ = require('lodash');
const Bluebird = require('bluebird');

function AppCompiler (app) {
	this.compileAndWatch = function() {
		return Bluebird.map(app, function(service) {
			var serviceCompiler = new ServiceCompiler(service);

			return serviceCompiler.compileAndWatch();
		});
	};
}

module.exports = AppCompiler;
