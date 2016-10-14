"use strict";

function AppDefinition (blueprints) {
	this.getServiceBlueprints = function() {
		return blueprints;
	};
}

module.exports = AppDefinition;
