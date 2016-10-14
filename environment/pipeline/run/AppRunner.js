"use strict";
const ServiceRunner = require('./ServiceRunner');
const Bluebird = require('bluebird');

function AppRunner (app) {
	var services = app.getServiceBlueprints();

	this.run = function() {
		return Bluebird.map(services, function(service) {
			const serviceRunner = new ServiceRunner(service);

			return serviceRunner.run();
		});
	};
}

module.exports = AppRunner;
