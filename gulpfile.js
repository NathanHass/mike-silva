var gulp          = require('gulp');
var gulpPlugin    = require('gulp-load-plugins')();
var webpack       = require('webpack');
var webpackConfig = require('./webpack.config');
var browserSync   = require('browser-sync');
var autoprefixer  = require('autoprefixer');
var runSequence   = require('run-sequence');
var del           = require('del');

/**
*   Delete the static build folder to clean out any old or useless code
*/
gulp.task('del', function() {
    return del('./static/build');
});

/**
*   Bundles JS
*/
gulp.task('scripts', function(cb) {
    webpack(webpackConfig, function(err, stats) {
        if (err) {
            throw new gulpPlugin.util.PluginError('webpack', err);
        }

        gulpPlugin.util.log('[webpack]', stats.toString({
            colors: true
        }));

        cb();
    });
});

/**
*   Compile css for dev
*/
gulp.task('styles', function() {
    return gulp.src('./static/scss/**/*.scss')
        .pipe(gulpPlugin.sourcemaps.init())
        .pipe(gulpPlugin.sass({
            outputStyle : 'expanded',
            includePaths: ['bower_components']
        }))
        .on('error', gulpPlugin.sass.logError)
        .pipe(gulpPlugin.sourcemaps.write({includeContent: false}))
        .pipe(gulpPlugin.sourcemaps.init({loadMaps: true}))
        .pipe(gulpPlugin.postcss([
            autoprefixer({
                browsers: ['last 3 versions']
            })
        ]))
        .pipe(gulpPlugin.sourcemaps.write('.'))
        .pipe(gulp.dest('./static/build/css/'))
        .pipe(browserSync.stream());
});

/**
*   Compile css for production
*/
gulp.task('styles-production', function() {
    return gulp.src('./static/scss/**/*.scss')
        .pipe(gulpPlugin.sass({
            includePaths: ['bower_components']
        }))
        .on('error', gulpPlugin.sass.logError)
        .pipe(gulpPlugin.postcss([
            autoprefixer({
                browsers: ['last 3 versions']
            })
        ]))
        .pipe(gulpPlugin.minifyCss())
        .pipe(gulp.dest('./static/build/css/'));
});

/**
*   Build a custom modernizr file
*/
gulp.task('modernizr', function() {
    gulp.src(['./static/scss/**/*.scss', './static/js/**/*.js'])
        .pipe(gulpPlugin.modernizr({
            options: [
                "setClasses"
            ]
        }))
        .pipe(gulpPlugin.uglify())
        .pipe(gulp.dest('./static/build/'));
});

/**
*   Reload broswser on file changes
*/
gulp.task('browser-sync', function() {
    var files = [
        './static/scss/**/*.scss',
        './static/js/**/*.js',
        './**/**/*.twig',
        '*.php'
    ];

    browserSync.init(files, {
        proxy: 'build.mike-silva.dev',
        notify: true,
        server: false,
        startPath: null,
        open: false,
        host: null,
        ghostMode: false
    });

    gulp.watch('./static/scss/**/*.scss', ['styles']);
    gulp.watch('./static/js/**/*.js', ['scripts']);
    gulp.watch('./static/static/build/*.js').on('change', browserSync.reload);
});


/**
*   Gulp task for dev
*/
gulp.task('dev', function() {
    runSequence('styles', 'scripts', 'modernizr', 'browser-sync');
});

/**
*   Gulp task for production
*/
gulp.task('production', function() {
    runSequence('del', 'styles-production', 'scripts', 'modernizr');
});
