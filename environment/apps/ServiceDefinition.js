"use strict";

const ServiceType = require('./ServiceType');

function ServiceDefinition (definition) {
	this.getServiceName = function() {
		return definition.name;
	};

	this.getWorkspacePath = function() {
		return definition.workspacePath;
	};

	this.getEntryFile = function() {
		return definition.entryFile;
	};

	this.getType = function() {
		return definition.type || ServiceType.none;
	};
}

module.exports = ServiceDefinition;
