"use strict";

const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const PathProvider = require('./PathProvider');

const root = PathProvider.getWorkspacePath();

console.log('===================================================================');
console.log(`Performing "typings install" inside root folder`);
console.log('===================================================================');

child_process.execSync('node node_modules/typings/dist/bin.js install', {cwd: process.cwd(), env: process.env, stdio: 'inherit'});

typings_install_recursive(root);

function typings_install_recursive(folder) {
	// Since this script is intended to be run as a "preinstall" command,
	// skip the root folder, because it will be `npm install`ed in the end.
	if (hasTypingsJson(folder)) {
		console.log('===================================================================');
		console.log(`Performing "typings install" inside ${folder === root ? 'root folder' : './' + path.relative(root, folder)}`);
		console.log('===================================================================');

		typings_install(folder);
	}

	for (let subfolder of subfolders(folder)) {
		typings_install_recursive(subfolder);
	}
}

function typings_install(folder) {
	var typingsModuleLocation = PathProvider.join(PathProvider.getWorkspacePath(), '..', 'node_modules', 'typings', 'dist', 'bin.js');

	child_process.execSync(`node ${typingsModuleLocation} install`, {cwd: folder, env: process.env, stdio: 'inherit'});
}

function subfolders(folder) {
	return fs.readdirSync(folder)
		.filter(subfolder => fs.statSync(path.join(folder, subfolder)).isDirectory())
		.filter(subfolder => subfolder !== 'node_modules' && subfolder[0] !== '.')
		.map(subfolder => path.join(folder, subfolder));
}

function hasTypingsJson(folder) {
	return fs.existsSync(path.join(folder, 'typings.json'));
}
