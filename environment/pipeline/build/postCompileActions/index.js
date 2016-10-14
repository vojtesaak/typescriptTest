const Bluebird = require('bluebird');

const postCompileActions = [
	require('./StaticFileMover')
];

function PostProcessorsRunner() {
	this.run = function(service) {
		return Bluebird.each(postCompileActions, (postCompiler) => postCompiler.run(service));
	}
}

module.exports = new PostProcessorsRunner();
