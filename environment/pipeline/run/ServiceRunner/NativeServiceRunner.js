'use strict';

const PathProvider = require('../../../utils/PathProvider');
const child_process = require('child_process');
const fs = require('fs');

/**
 * Run service as child process
 * Known problem is that cwd is set to '/' instead of passed cwd
 * @constructor
 */
class NativeServiceRunner {

	constructor(service) {
		this.service = service;

		this._distPath = PathProvider.getDistPath(service.name);
		this._stdout = fs.openSync(PathProvider.join(this._distPath, 'console.log'), 'a');
		this._stderr = fs.openSync(PathProvider.join(this._distPath, 'err.log'), 'a');

		this._childProcess = null;
	}

	run() {
		this._childProcess = child_process.spawn(`${this.getRunAppName()}`, [this.service.run.entry + '.bundle.js'], {
			cwd: this._distPath,
			env: process.env,
			stdio: ['ignore', this._stdout, this._stderr]
		});
	}

	getRunAppName() {
		if(this.service.run.command && this.service.run.command !== 'node') {
			return `../../node_modules/${this.service.run.command}/bin/${this.service.run.command}`;
		}

		return this.service.run.command || 'node';
	}
}

module.exports = NativeServiceRunner;
