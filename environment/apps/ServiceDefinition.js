"use strict";

function ServiceDefinition (Name, workspacePath, entryFile) {
	this.getServiceName = function() {
		return Name;
	};

	this.getWorkspacePath = function() {
		return workspacePath;
	};

	this.getEntryFile = function() {
		return entryFile;
	};
}

module.exports = ServiceDefinition;
