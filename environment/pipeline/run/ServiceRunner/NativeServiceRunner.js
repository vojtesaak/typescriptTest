"use strict";
const PathProvider = require('../../../utils/PathProvider');
const child_process = require('child_process');
const fs = require('fs');

/**
 * Run service as child process
 * Known problem is that cwd is set to '/' instead of passed cwd
 * @constructor
 */
function NativeServiceRunner (service) {
	const distPath = PathProvider.getDistPath(service.getServiceName());
	const stdout = fs.openSync(PathProvider.join(distPath, 'console.log'), 'a');
	const stderr = fs.openSync(PathProvider.join(distPath, 'err.log'), 'a');

	let childProcess = null;

	this.run = function() {
		childProcess = child_process.spawn(`node`, [service.getServiceName() + '.bundle.js'], {cwd: distPath, env: process.env, stdio: ['ignore', stdout, stderr]});
	};
}

module.exports = NativeServiceRunner;
