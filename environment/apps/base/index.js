const ServiceDefinition = require('../ServiceDefinition');

module.exports = [
	new ServiceDefinition('TestBackend', 'backend', 'app.ts'),
	new ServiceDefinition('NotSoTestedBackend', 'backend', 'app.ts'),
];
