var basePath = 'src',
    app = basePath + '/app/',
    build = 'dist/',
    vendorsPath = 'node_modules/',
    tests = basePath + '/tests/**/**/*spec.js';

exports.paths = {
    build: build,
    app: app,
    basePath: basePath,
    vendorsPath: vendorsPath,
    tests: tests,

    inputPath: {
        modules: app + '**/**/*.module.js',
        js: [app + '**/**/*.js', '!' + app + '**/**/*.module.js'],
        scss: app + '**/*.scss',
        img: app + 'assets/images/*.*',
        html: app + '**/*.html',
        cssLibs: [
            vendorsPath + 'bootstrap/dist/css/bootstrap.min.css'
            // vendorsPath + 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'
        ],
        fontsLibs: [vendorsPath + 'bootstrap/dist/fonts/*.*'],
        jsLibs: [
            vendorsPath + 'angular/angular.min.js',
            vendorsPath + 'angular-route/angular-route.min.js',
            vendorsPath + 'angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            vendorsPath + 'jquery/dist/jquery.min.js',
            // vendorsPath + 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
            vendorsPath + 'moment/min/moment.min.js'
        ]
    },

    outputPath: {
        js: build + 'js',
        css: build + 'css',
        fonts: build + 'fonts',
        img: build + 'img',
        html: build
    }
};