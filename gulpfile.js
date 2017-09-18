var gulp = require('gulp'),
    runSequence = require('gulp-run-sequence'),
    connect = require("gulp-connect");

require('require-dir')('./gulpTasks');

gulp.task('build', function(cb) {
    runSequence('clean', ['css', 'fonts', 'img', 'html'], 'js', cb);
});

gulp.task('default', function(cb) {
    runSequence('build', 'watch', cb);

    connect.server({
        root: './dist/',
        port: 8080,
        livereload: true
    });
});