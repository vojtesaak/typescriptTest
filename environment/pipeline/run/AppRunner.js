'use strict';

const ServiceRunner = require('./ServiceRunner');
const Bluebird = require('bluebird');

class AppRunner {

	constructor(app) {
		this._services = app.getServiceBlueprints();
	}

	run() {
		return Bluebird.map(this._services, (service) => {
			const serviceRunner = new ServiceRunner(service);
			return serviceRunner.run();
		});
	}
}

module.exports = AppRunner;
