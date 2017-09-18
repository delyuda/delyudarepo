var gulp = require('gulp'),
    paths = require('../gulpConfig').paths;

gulp.task('img', function() {
    return gulp.src(paths.inputPath.img)
      .pipe(gulp.dest(paths.outputPath.img));
});
