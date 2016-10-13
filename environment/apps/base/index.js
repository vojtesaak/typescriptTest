const ServiceDefinition = require('../ServiceDefinition');
const AppDefinition = require('../AppDefinition');
const ServiceType = require('../ServiceType');

module.exports = new AppDefinition([
	new ServiceDefinition({
		name: 'TestBackend',
		workspacePath: 'backend',
		entryFile: 'app.ts',
		type: ServiceType.backend
	}),
	new ServiceDefinition({
		name: 'NotSoTestedBackend',
		workspacePath: 'backend',
		entryFile: 'app.ts',
		type: ServiceType.backend
	}),
	// new ServiceDefinition({
	// 	name: 'FancyUI',
	// 	workspacePath: 'ui',
	// 	entryFile: 'app.ts',
	// 	type: ServiceType.ui
	// }),
]);
