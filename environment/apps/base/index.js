const AppDefinition = require('../AppDefinition');

module.exports = new AppDefinition([
	require('./NotSoTestedBackendBlueprint'),
	require('./UiAppBlueprint')
]);
