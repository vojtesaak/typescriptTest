"use strict";
const PathProvider = require('../../../utils/PathProvider');
const child_process = require('child_process');
const fs = require('fs');

function NativeServiceRunner (service) {
	const distPath = PathProvider.getDistPath(service.getServiceName());
	const stdout = fs.openSync(PathProvider.join(distPath, 'console.log'), 'a');
	const stderr = fs.openSync(PathProvider.join(distPath, 'err.log'), 'a');

	this.run = function() {
        child_process.spawn(`node`, [PathProvider.join(distPath, 'bundle.js')], {cwd: distPath, end: process.env, stdio: ['ignore', stdout, stderr]});
	};
}

module.exports = NativeServiceRunner;
