'use strict';

const ncp = require('ncp');
const Bluebird = require('bluebird');
const PathProvider = require('../../../utils/PathProvider');


class StaticFileMover {

	run(service) {
		const serviceName = service.name;
		const dist = PathProvider.getDistPath(serviceName);
		const source = PathProvider.getSourcePath(service.workspacePath);

		return Bluebird.map(this._getFoldersToMove(service), (movePair) => {
			return this._moveStaticFiles(source, movePair, dist);
		});
	}

	_moveStaticFiles(source, movePair, dist) {
		const from = PathProvider.join(source, movePair.sourceFolder);
		const to = PathProvider.join(dist, movePair.targetFolder);

		return Bluebird.fromCallback( (callback) => {
			ncp(from, to, callback);
		});
	}

	_getFoldersToMove(service){
		return service.build.unparsed || [];
	}


}

module.exports = new StaticFileMover();
