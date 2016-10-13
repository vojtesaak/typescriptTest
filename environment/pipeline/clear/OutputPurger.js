"use strict";

const Bluebird = require('bluebird');
const rimraf = require('rimraf');
const PathProvider = require('../../utils/PathProvider');

var OutputPurger = {
	clearOutput: function() {
		return Bluebird.fromCallback(function(callback) {
			rimraf(PathProvider.getDistPath('*'), callback);
		}).tap(function() {
			console.log("Previous output was cleared");
		});
	}
};

Object.freeze(OutputPurger);

module.exports = OutputPurger;
