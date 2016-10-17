'use strict';

const ServiceCompiler = require('./ServiceCompiler');
const _ = require('lodash');
const Bluebird = require('bluebird');

class AppCompiler {

	constructor(app) {
		this.app = app;
	}

	compileAndWatch() {
		return Bluebird.map(this.app.getServiceBlueprints(), (serviceBP) => {
			const serviceCompiler = new ServiceCompiler(serviceBP);
			return serviceCompiler.compileAndWatch();
		});
	}
}

module.exports = AppCompiler;
