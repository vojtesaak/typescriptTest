const ServiceDefinition = require('../ServiceDefinition');
const AppDefinition = require('../AppDefinition');

module.exports = new AppDefinition([
	new ServiceDefinition('TestBackend', 'backend', 'app.ts'),
	new ServiceDefinition('NotSoTestedBackend', 'backend', 'app.ts'),
]);
