'use strict';

const Bluebird = require('bluebird');

const postCompileActions = [
	require('./StaticFileMover'),
	require('./NodeJsDepsMover')
];

class PostProcessorsRunner {

	run (service) {
		return Bluebird.each(postCompileActions, (postCompiler) => postCompiler.run(service));
	}
}

module.exports = new PostProcessorsRunner();
