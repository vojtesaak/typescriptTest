const OutputPurger = require('./pipeline/clear/OutputPurger');
const AppCompiler = require('./pipeline/build/AppCompiler');

const Apps = require('./apps');

const appName = process.argv[2];

if (isAppDefined()) {
	OutputPurger.clearOutput().then(compileApp);
} else {
	console.log("Usage: `npm start APP_NAME`");
	console.log("Example: `npm start VideoAdServer`");
}

function isAppDefined() {
	return !!getApp();
}

function compileApp() {
	var compiler = new AppCompiler(getApp());
	return compiler.compileAndWatch();
}

function getApp() {
	return Apps[appName.toLowerCase()];
}
