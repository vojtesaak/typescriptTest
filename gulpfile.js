var gulp = require('gulp'),
	tsc = require('gulp-typescript'),
	sourcemaps = require('gulp-sourcemaps'),
	webpack = require('webpack-stream'),
	nodemon = require('gulp-nodemon'),
	runSequence = require('run-sequence'),
	config = require('./webpack.config.js'),
	gls = require('gulp-live-server');

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
/*
var webpackConfig = {
	devtool: 'source-map',
	debug: true,
	cache: false,
	module: {
		loaders: [
			{ test: /\.scss$/, loader: 'style!css!sass' }
		]
	},
	output: {
		filename: 'app.js'
	}
};*/


var server = null;

gulp.task('compile-ts', function () {
	return gulp.src(['server/**/*.ts', 'typings/**/*.ts'])
		.pipe(sourcemaps.init())
		.pipe(tsc(tsconfig))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/server'));
});

//gulp.task('compile-angular-ts', function () {
//	return gulp.src(['client/src/**/*.ts', 'typings/**/*.ts'])
//		.pipe(sourcemaps.init())
//		.pipe(tsc(tsconfig))
//		.pipe(sourcemaps.write())
//		.pipe(gulp.dest('dist/public'));
//});


//gulp.task('webpack', function() {
//	return gulp.src('client')
//		.pipe(webpack(config))
//		.pipe(gulp.dest(config.output.path));
//});


gulp.task('webpack-app', /*['compile-angular-ts'],*/ function () {
	return gulp.src('client/src/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(webpack(config))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.output.path));
});

gulp.task('watch', function() {
	gulp.watch(['server/**/*.ts'], ['compile-ts']);
	gulp.watch(['client/src/**/*.ts'], ['webpack-app']);
	gulp.watch(['client/public/**/*.js'], function (file) {
		if (server) {
			server.notify.apply(server, [file]);
		}
	});
});

gulp.task('start', ['compile-ts'], function() {
	//server = gls.new('dist/server/server.js');
	//server.start();
	nodemon({
		script: 'dist/server/server.js',
		ext: 'js json',
		watch: ['dist/server'],
		env: {
			NODE_ENV: 'development'
		}
	});
});

gulp.task('default', ['compile-ts', 'watch', 'start']);
