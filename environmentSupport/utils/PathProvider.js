var path = require('path');

var PathProvider = {
	getDistPath : function(appName) {
		return path.join(process.cwd(), 'dist', appName);
	},

	getWorkspacePath: function() {
		return path.join(process.cwd(), 'workspace');
	},

	getAppPath: function(appPath) {
		return path.join(this.getWorkspacePath(), appPath);
	},

	join: path.join
};

Object.freeze(PathProvider);

module.exports = PathProvider;
