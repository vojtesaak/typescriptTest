'use strict';

const Bluebird = require('bluebird');
const _ = require('lodash');
const ncp = require('ncp');
const PathProvider = require('../../../utils/PathProvider');

class StaticFileMover {
    run(service) {
        if (!this._isAtLeastNodeEntryPresent(service)) {
            return Bluebird.resolve();
        }

        const serviceName = service.name;
        const dist = PathProvider.join(PathProvider.getDistPath(serviceName), 'node_modules');
        const source = PathProvider.join(PathProvider.getWorkspacePath(), 'node_modules');

        return this._moveStaticFiles(source, dist);
    }

    _moveStaticFiles(source, dist) {
        return Bluebird.fromCallback((callback) => {
            ncp(source, dist, callback);
        });
    }

    _isAtLeastNodeEntryPresent(service) {
        return _.find(service.build.entries, function (entry) {
            return entry.target === 'node';
        });
    }
}

module.exports = new StaticFileMover();
