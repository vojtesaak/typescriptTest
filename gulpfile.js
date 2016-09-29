var gulp = require('gulp'),
	concat = require('gulp-concat'),
	tsc = require('gulp-typescript'),
	sourcemaps = require('gulp-sourcemaps'),
	webpack = require('webpack-stream'),
	nodemon = require('gulp-nodemon');



gulp.task('compile-ts', function () {

	var tsconfig = {
		target: 'ES5',
		module: 'commonjs',
		declaration: false,
		noImplicitAny: false,
		removeComments: true,
		noLib: false,
		emitDecoratorMetadata: true,
		experimentalDecorators: true,
		sourceMap: true
	};

	return gulp.src(['server/src/**/*.ts', 'typings/**/*.ts'])
		.pipe(sourcemaps.init())
		.pipe(tsc(tsconfig))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('server/dist'));
});


gulp.task('default', ['compile-ts']);
