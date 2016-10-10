
const path = require('path');
const ROOT = process.cwd();


const PATHS = {
	src: path.join(ROOT,  '/client/src'),
	build: path.join(ROOT, '/client/dist/'),
	root: {
		join,
		get: ROOT
	}

};


function hasProcessFlag(flag) {
	return process.argv.join('').indexOf(flag) > -1;
}


function join(args) {
	return path.join(ROOT, args);
}


module.exports = {

	hasProcessFlag,

	PATHS: PATHS
};

