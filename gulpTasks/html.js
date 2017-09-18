var gulp = require('gulp'),
    connect = require("gulp-connect"),
    paths = require('../gulpConfig').paths;

gulp.task('html', function() {
    return gulp.src(paths.inputPath.html)
      .pipe(gulp.dest(paths.outputPath.html))
      .pipe(connect.reload());
});
