const webpack = require("webpack");
const ConfigBuilder = require("./bundling/ConfigBuilder");
const config = require("../../../config");
const _ = require("lodash");

function AppCompiler(appName, appPath) {
	const compiler = webpack(ConfigBuilder.getNewConfig(appName, appPath, 'app.ts'));

	this.compileAndWatch = function () {
		compiler.watch({
			poll: true,
			aggregateTimeout: config.build.aggregateTimeoutMs
		}, compileCompleteCallback);
	};

	function compileCompleteCallback(err, stats) {
		if (err) {
			return handleFatalError(err);
		}

		var jsonStats = stats.toJson();
		if (jsonStats.errors.length > 0) {
			return handleSoftErrors(jsonStats.errors);
		}

		if (jsonStats.warnings.length > 0) {
			handleWarnings(jsonStats.warnings);
		}

		successfullyCompiled();
	}

	function handleFatalError(err) {
		console.error('An error occurred in compiler', err);
	}

	function handleSoftErrors(errors) {
		console.warn("Some errors occurred while bundling app: ");

		_.forEach(errors, function (error) {
			console.warn(error);
		});
	}

	function handleWarnings(warns) {
		console.log('Some warnings were found while bundling app: ');

		_.forEach(warns, function (error) {
			console.log(error);
		});
	}

	function successfullyCompiled() {
		console.log("Bundling complete!!!");
	}
}

module.exports = AppCompiler;
