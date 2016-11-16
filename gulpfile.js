const gulp = require('gulp'),
	tscConfig = require('./tsconfig.json'),
	gulpTypescript = require('gulp-typescript'),
	sourceMaps = require('gulp-sourcemaps'),
	nodemon = require('gulp-nodemon');


gulp.task('compile-ts', () => {
	return gulp
		.src(['server/src/**/*.ts'])
		.pipe(gulpTypescript(tscConfig.compilerOptions))
		.pipe(sourceMaps.write('./'))
		.pipe(gulp.dest('server/dist'));
});


gulp.task('watch', () =>  {
	gulp.watch(['server/**/*.ts'], ['compile-ts']);
});



gulp.task('start', ['compile-ts'], () => {
	//gulp.watch(['server/!**!/!*.ts'], ['compile-ts']);
	nodemon({
	 	script: 'server/dist/app.js',
	 	ext: 'js json',
	 	env: {
	 		NODE_ENV: process.env.NODE_ENV
	 	}
	});
});


gulp.task('default', ['compile-ts', 'start', 'watch']);
