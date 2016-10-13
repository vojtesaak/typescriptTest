const OutputPurger = require('./pipeline/clear/OutputPurger');
const ServiceCompiler = require('./pipeline/build/ServiceCompiler');

const Apps = require('./apps');
const _ = require('lodash');

const appName = process.argv[2];

var appServices = Apps[appName.toLowerCase()];

if(appServices) {
	OutputPurger.clearOutput().then(function() {
		_.forEach(appServices, function(service) {
			const compiler = new ServiceCompiler(service);

			compiler.compileAndWatch();
		});
	});
} else {
	console.log("Usage: `npm start APP_NAME`");
	console.log("Example: `npm start VideoAdServer`");
}
