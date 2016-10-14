"use strict";

const ncp = require('ncp');
const Bluebird = require('bluebird');
const PathProvider = require('../../../utils/PathProvider');

function StaticFileMover() {
	this.run = function (service) {
		const serviceName = service.name;
		const dist = PathProvider.getDistPath(serviceName);
		const source = PathProvider.getSourcePath(service.workspacePath);

		return Bluebird.map(getFoldersToMove(service), function (movePair) {
			return moveStaticFiles(source, movePair, dist);
		});
	};

	function moveStaticFiles(source, movePair, dist) {
		const from = PathProvider.join(source, movePair.sourceFolder);
		const to = PathProvider.join(dist, movePair.targetFolder);

		return Bluebird.fromCallback(function (callback) {
			ncp(from, to, callback);
		});
	}

	function getFoldersToMove(service){
		return service.build.unparsed || [];
	}
}

module.exports = new StaticFileMover();
