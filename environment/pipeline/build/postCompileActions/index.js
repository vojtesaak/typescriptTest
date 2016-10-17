'use strict';

const Bluebird = require('bluebird');

const postCompileActions = [
	require('./StaticFileMover')
];

class PostProcessorsRunner {

	run (service) {
		return Bluebird.each(postCompileActions, (postCompiler) => postCompiler.run(service));
	}
}

module.exports = new PostProcessorsRunner();
