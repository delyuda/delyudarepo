var gulp = require('gulp'),
    paths = require('../gulpConfig').paths;

gulp.task('fonts', function() {
    return gulp.src(paths.inputPath.fontsLibs)
        .pipe(gulp.dest(paths.outputPath.fonts));
});
