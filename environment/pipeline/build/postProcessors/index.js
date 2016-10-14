const Bluebird = require('bluebird');
const ServiceTypes = require('../../../apps/ServiceType');
const postcompilers = {
	[ServiceTypes.backend]: [],
	[ServiceTypes.ui]: [
		require('./StaticFileMover')
	],
};

function PostProcessorsRunner() {
	this.run = function(service) {
		return Bluebird.each(postcompilers[service.getType()], (postCompiler) => postCompiler.run(service));
	}
}

module.exports = new PostProcessorsRunner();
