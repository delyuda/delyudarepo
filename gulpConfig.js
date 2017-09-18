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
        ],
        fontsLibs: [vendorsPath + 'bootstrap/dist/fonts/*.*'],
        jsLibs: [
            vendorsPath + 'angular/angular.min.js',
            vendorsPath + 'angular-route/angular-route.min.js'
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