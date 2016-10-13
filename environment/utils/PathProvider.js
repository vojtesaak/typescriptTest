var path = require('path');

var PathProvider = {
	getDistPath : function(serviceName) {
		return path.join(process.cwd(), 'dist', serviceName);
	},

	getWorkspacePath: function() {
		return path.join(process.cwd(), 'workspace');
	},

	getSourcePath: function(workspaceLoc) {
		return path.join(this.getWorkspacePath(), workspaceLoc);
	},

	join: path.join
};

Object.freeze(PathProvider);

module.exports = PathProvider;
