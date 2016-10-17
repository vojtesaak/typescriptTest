'use strict';

const Bluebird = require('bluebird');
const rimraf = require('rimraf');
const PathProvider = require('../../utils/PathProvider');

var OutputPurger = {

	clearOutput() {
		return Bluebird.fromCallback((callback) => {
			rimraf(PathProvider.getDistPath('*'), callback);
		}).tap(() => console.log('Previous output was cleared') );
	}
};

Object.freeze(OutputPurger);

module.exports = OutputPurger;
