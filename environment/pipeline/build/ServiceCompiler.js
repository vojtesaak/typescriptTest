const webpack = require("webpack");
const _ = require("lodash");
const Bluebird = require('bluebird');

const config = require("../../../config");
const ConfigBuilder = require("./bundling/ConfigBuilder");
const postProcessors = require('./postProcessors');

function ServiceCompiler(service) {
	const serviceName = service.getServiceName();
	const compiler = getCompiler();

	this.compileAndWatch = function () {
		console.log(`Started to compile ${serviceName}`);

		return Bluebird.fromCallback(function (callback) {
			compiler.watch({
				poll: true,
				aggregateTimeout: config.build.aggregateTimeoutMs
			}, function (err, stats) {
				logResult(err, stats);

				callback(err, stats);
			});
		}).then(function() {
			return postProcessors.run(service);
		}).catch(function(err) {
			console.log(err);
		});
	};

	function getCompiler() {
		return webpack(ConfigBuilder.getNewConfig(service));
	}

	function logResult(err, stats) {
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
