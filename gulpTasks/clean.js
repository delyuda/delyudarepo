var del = require('del'),
    gulp = require('gulp'),
    paths = require('../gulpConfig').paths;

gulp.task('clean', function () {
    return del(paths.build);
});
