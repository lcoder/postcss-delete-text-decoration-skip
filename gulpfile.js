var gulp = require('gulp');
var postcss = require('gulp-postcss');
var deleteTxtDecSkip = require('./index.js');

var watchFiles = ['index.js', 'test/src/**/*'];

gulp.task('css', function () {
	return gulp.src('./test/src/**/*.css')
		.pipe( postcss( [ deleteTxtDecSkip() ] ) )
		.pipe( gulp.dest('./test/dist') )
});

gulp.task('watch', function () {
	gulp.watch(watchFiles, gulp.series( ['css']));
});

gulp.task('default', gulp.series( ['watch'] ))

