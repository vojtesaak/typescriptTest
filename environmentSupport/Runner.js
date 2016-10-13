var webpack = require('webpack');
var ConfigBuilder = require('./pipeline/build/bundling/ConfigBuilder');
var _ = require('lodash');

var appName = process.argv[2];
var appPath = process.argv[3];

if(appName && appPath) {
	var compiler = webpack(ConfigBuilder.getNewConfig(appName, appPath, 'app.ts'));

	compiler.run(function(err, stats) {
		console.log(stats);
	});
}
