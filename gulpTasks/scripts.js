var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    addsrc = require('gulp-add-src'),
    connect = require("gulp-connect"),
    ngAnnotate = require('gulp-ng-annotate'),
    paths = require('../gulpConfig').paths;

gulp.task('js', ['lint'], function() {
    return gulp.src(paths.inputPath.jsLibs)
        .pipe(addsrc.append(paths.inputPath.modules))
        .pipe(addsrc.append(paths.inputPath.js))
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.outputPath.js))
        .pipe(connect.reload());
});

gulp.task('lint', function () {
    return gulp.src(paths.inputPath.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
