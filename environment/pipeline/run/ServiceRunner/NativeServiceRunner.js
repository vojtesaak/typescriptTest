"use strict";
const PathProvider = require('../../../utils/PathProvider');
const child_process = require('child_process');
const fs = require('fs');

/**
 * Run service as child process
 * Known problem is that cwd is set to '/' instead of passed cwd
 * @constructor
 */
function NativeServiceRunner(service) {
	const distPath = PathProvider.getDistPath(service.name);
	const stdout = fs.openSync(PathProvider.join(distPath, 'console.log'), 'a');
	const stderr = fs.openSync(PathProvider.join(distPath, 'err.log'), 'a');

	let childProcess = null;

	this.run = function () {
		childProcess = child_process.spawn(`${getRunAppName()}`, [service.run.entry + '.bundle.js'], {
			cwd: distPath,
			env: process.env,
			stdio: ['ignore', stdout, stderr]
		});
	};

	function getRunAppName() {
		if(service.run.command && service.run.command !== 'node') {
			return `../../node_modules/${service.run.command}/bin/${service.run.command}`;
		}

		return service.run.command || 'node';
	}
}

module.exports = NativeServiceRunner;
