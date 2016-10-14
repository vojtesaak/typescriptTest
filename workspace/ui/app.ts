import * as main from './app/main';

declare var require:any;

const connect = require('gulp-connect');
const config = {
	port: 9000,
	root: '',
	livereload: {port: 35730},

	middleware: function () {
		return [
		];
	}
};

connect.server(config);
