var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    addsrc = require('gulp-add-src'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require("gulp-connect"),
    paths = require('../gulpConfig').paths;

gulp.task('css', function() {
    return gulp.src(paths.inputPath.cssLibs)
        .pipe(addsrc(paths.inputPath.scss))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.outputPath.css))
        .pipe(connect.reload());;
});
