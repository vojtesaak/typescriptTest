"use strict";

const ncp = require('ncp');
const Bluebird = require('bluebird');
const PathProvider = require('../../../utils/PathProvider');

function StaticFileMover() {
	this.run = function (service) {
		const serviceName = service.getServiceName();

		const dist = PathProvider.getDistPath(serviceName);
		const source = PathProvider.getSourcePath(service.getWorkspacePath());

		var staticFileFolder = service.getStaticFileFolder();
        if (staticFileFolder) {
			return Bluebird.fromCallback(function (callback) {
				console.log(PathProvider.join(source, staticFileFolder), dist);
				ncp(PathProvider.join(source, staticFileFolder), dist, callback);
			});
		} else {
			return Bluebird.resolve();
		}
	};
}

module.exports = new StaticFileMover();
