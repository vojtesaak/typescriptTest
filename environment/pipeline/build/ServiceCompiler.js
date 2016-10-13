const webpack = require("webpack");
const ConfigBuilder = require("./bundling/ConfigBuilder");
const config = require("../../../config");
const _ = require("lodash");

function ServiceCompiler(service) {
	const serviceName = service.getServiceName();
	const workspacePath = service.getWorkspacePath();
	const entryFile = service.getEntryFile();

    const compiler = webpack(ConfigBuilder.getNewConfig(serviceName, workspacePath, entryFile));

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

		const jsonStats = stats.toJson();
		if (jsonStats.errors.length > 0) {
			return handleSoftErrors(jsonStats.errors);
		}

		if (jsonStats.warnings.length > 0) {
			handleWarnings(jsonStats.warnings);
		}

		successfullyCompiled();
	}

	function handleFatalError(err) {
		console.error(`An error occurred in compiler`, err);
	}

	function handleSoftErrors(errors) {
		console.warn(`Some errors occurred while bundling service ${serviceName}: `);

		_.forEach(errors, function (error) {
			console.warn(error);
		});
	}

	function handleWarnings(warns) {
		console.log(`Some warnings were found while bundling service ${serviceName}: `);

		_.forEach(warns, function (error) {
			console.log(error);
		});
	}

	function successfullyCompiled() {
		console.log(`Bundling of service ${serviceName} complete!!!`);
	}
}

module.exports = ServiceCompiler;
