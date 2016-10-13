const AppCompiler = require('./pipeline/build/AppCompiler');

const appName = process.argv[2];
const appPath = process.argv[3];

if(appName && appPath) {
	const compiler = new AppCompiler(appName, appPath);

	compiler.compileAndWatch();
} else {
	console.log("Usage: `npm start APP_NAME PATH_TO_APP_IN_WORKSPACE`");
	console.log("Example: `npm start CommandBackend backend`");
}
