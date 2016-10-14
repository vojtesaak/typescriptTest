const webpack = require("webpack");
const _ = require("lodash");
const Bluebird = require('bluebird');

const config = require("../../../config");
const ConfigBuilder = require("./bundling/ConfigBuilder");
const postCompileActions = require('./postCompileActions');

function ServiceCompiler(serviceBlueprint) {
	const compiler = getCompiler();

	this.compileAndWatch = function () {
		console.log(`Started to compile ${serviceBlueprint.name}`);

		return Bluebird.fromCallback(function (callback) {
			compiler.watch({
				poll: true,
				aggregateTimeout: config.build.aggregateTimeoutMs
			}, function (err, stats) {
				logResult(err, stats);

				callback(err, stats);
			});
		}).then(function() {
			return postCompileActions.run(serviceBlueprint);
		}).catch(function(err) {
			console.log(err);
		});
	};

	function getCompiler() {
		return webpack(ConfigBuilder.getNewConfig(serviceBlueprint));
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
		console.warn(`Some errors occurred while bundling service ${serviceBlueprint.name}: `);

		_.forEach(errors, function (error) {
			console.warn(error);
		});
	}

	function handleWarnings(warns) {
		console.log(`Some warnings were found while bundling service ${serviceBlueprint.name}: `);

		_.forEach(warns, function (error) {
			console.log(error);
		});
	}

	function successfullyCompiled() {
		console.log(`Bundling of service ${serviceBlueprint.name} complete!!!`);
	}
}

module.exports = ServiceCompiler;
