"use strict";

const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const PathProvider = require('./PathProvider');

const root = PathProvider.getWorkspacePath();

npm_install_recursive(root);

function npm_install_recursive(folder) {
	// Since this script is intended to be run as a "preinstall" command,
	// skip the root folder, because it will be `npm install`ed in the end.
	if (hasPackageJson(folder)) {
		console.log('===================================================================');
		console.log(`Performing "npm install" inside ${folder === root ? 'root folder' : './' + path.relative(root, folder)}`);
		console.log('===================================================================');

		npm_install(folder);
	}

	for (let subfolder of subfolders(folder)) {
		npm_install_recursive(subfolder);
	}
}

function npm_install(where) {
	child_process.execSync('npm install', {cwd: where, env: process.env, stdio: 'inherit'});
}

function subfolders(folder) {
	return fs.readdirSync(folder)
		.filter(subfolder => fs.statSync(path.join(folder, subfolder)).isDirectory())
		.filter(subfolder => subfolder !== 'node_modules' && subfolder[0] !== '.')
		.map(subfolder => path.join(folder, subfolder));
}

function hasPackageJson(folder) {
	return fs.existsSync(path.join(folder, 'package.json'));
}
