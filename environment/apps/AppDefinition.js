"use strict";

function AppDefinition (services) {
	this.getServices = function() {
		return services;
	};
}

module.exports = AppDefinition;
