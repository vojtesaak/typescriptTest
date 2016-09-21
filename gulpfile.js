var gulp = require('gulp'),
	tsc = require('gulp-typescript'),
	sourcemaps = require('gulp-sourcemaps'),
	webpack = require('webpack-stream'),
	nodemon = require('gulp-nodemon'),
	config = require('./webpack.config.client.js');

var tsconfig = {
	target: 'ES5',
	module: 'commonjs',
	declaration: false,
	noImplicitAny: false,
	removeComments: true,
	noLib: false,
	emitDecoratorMetadata: true,
	experimentalDecorators: true
};



var server = null;

gulp.task('compile-ts', function () {
	return gulp.src(['server/**/*.ts', 'typings/**/*.ts'])
		.pipe(sourcemaps.init())
		.pipe(tsc(tsconfig))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/server'));
});



gulp.task('webpack-app', function () {
	return gulp.src('client/src/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(webpack(config))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.output.path));
});

gulp.task('watch', function() {
	//gulp.watch(['server/**/*.ts'], ['compile-ts']);
	//gulp.watch(['client/src/**/*.ts'], ['webpack-app']);
	/*gulp.watch(['client/public/!**!/!*.js'], function (file) {
		if (server) {
			server.notify.apply(server, [file]);
		}
	});*/
});

gulp.task('start', ['compile-ts'], function() {
	/*nodemon({
		script: 'dist/server/server.js',
		ext: 'js json',
		watch: ['dist/server'],
		env: {
			NODE_ENV: 'development'
		}
	});*/
});

gulp.task('default', ['compile-ts', 'start', 'watch']);
