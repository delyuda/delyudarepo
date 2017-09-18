var gulp = require('gulp'),
    paths = require('../gulpConfig').paths;

gulp.task('watch', function () {
    gulp.watch(paths.inputPath.js, ['js']);
    gulp.watch(paths.inputPath.scss, ['css']);
    gulp.watch(paths.inputPath.html, ['html']);
    gulp.watch(paths.inputPath.img, ['img']);
});
