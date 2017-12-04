var path = {
    src: {
        js: './frontend/src/js/init.js',
        js_dir: './frontend/src/js/**/*.js',
        libs: [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/underscore/underscore-min.js',
            './node_modules/backbone/backbone-min.js',
            './temp/app.js'
        ]
    },
    temp: {
        js: './temp'
    },
    build: {
        js: './server/public/js'
    }
};

var gulp = require('gulp');
var rigger = require('gulp-rigger');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

gulp.task('js', function() {
    gulp.src([
        path.src.js
    ])
        .pipe(rigger())
        .pipe(rename('app.js'))
        .pipe(gulp.dest(path.temp.js));
});

gulp.task('libs', function () {
    gulp.src(path.src.libs)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('watch', function () {
    gulp.watch(path.src.js_dir, ['build:dev']);
});


gulp.task('default', function(callback) {
    runSequence('js',
        'libs',
    callback);
});

gulp.task('build:dev', function (callback) {
    runSequence(
        'js',
        'libs',
        'watch',
        callback);
});