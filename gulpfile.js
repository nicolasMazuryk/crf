var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({lazy: true}),
    config = require('./gulp.config.json'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    vinylSourceStream = require('vinyl-source-stream'),
    vinylBuffer = require('vinyl-buffer'),
    runSequence = require('run-sequence'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync').create(),
    historyApiFallback = require('connect-history-api-fallback'),
    argv = require('yargs').argv,
    prod = argv.production;

/* @TODO production annotation not working */

gulp.task('js', () => {
    var sources = browserify({
        entries: config.scripts.entry,
        debug: true // Build source maps
    })
    .transform(babelify.configure({
        presets: ["es2015"]
    }));

    return sources.bundle()
        .pipe(vinylSourceStream(config.scripts.src[1]))
        .pipe(vinylBuffer())
        .pipe($.if(!prod, $.sourcemaps.init({
            loadMaps: true // Load the sourcemaps browserify already generated
        })))
        .pipe($.ngAnnotate())
        .pipe($.concat('bundle.js'))
        .pipe($.if(prod, $.uglify()))
        .pipe($.if(!prod, $.sourcemaps.write('.', {
            includeContent: true
        })))
        .pipe(gulp.dest(config.scripts.dest))
        .pipe(browserSync.stream())
        .on('error', $.util.log)
});

gulp.task('vendor', () => {
    gulp.src(config.scripts.vendor)
        .pipe($.concat('vendor.js'))
        .pipe($.if(prod, $.uglify()))
        .pipe(gulp.dest(config.scripts.dest))
});

gulp.task('template', () => {
    gulp.src(config.templateCache)
        .pipe($.angularTemplatecache('templates.js', {
            standalone: true
        }))
        .pipe(gulp.dest(config.html.dest_templates))
        .pipe(browserSync.stream())
});

gulp.task('sass', () => {
    gulp.src(config.sass.src)
        .pipe($.if(!prod, $.sourcemaps.init()))
        .pipe($.sass())
        .pipe($.postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe($.if(prod, $.csso()))
        .pipe($.if(!prod, $.sourcemaps.write()))
        .pipe(gulp.dest(config.sass.dest))
        .pipe(browserSync.stream())
});

gulp.task('vendor-css', () => {
    gulp.src(config.css.vendor)
        .pipe($.concatCss("vendor.css"))
        .pipe($.postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe($.if(prod, $.csso()))
        .pipe(gulp.dest(config.css.dest))
});
    /* @TODO useref */
gulp.task('html', () => {
    gulp.src(config.html.src)
        .pipe(gulp.dest(config.html.dest))
});

//
gulp.task('images', () => {
    gulp.src(config.img.src)
        .pipe($.imagemin({
            progressive: true, //jpg
            optimizationLevel: 1 // png (0-7)
        }))
        .pipe(gulp.dest(config.img.dest))
});

gulp.task('sprites', () => {
    var spriteData = gulp.src(config.img.sprite.src)
        .pipe($.spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            cssFormat: 'scss',
            algorithm: 'binary-tree',
            imgPath: '../images/sprite.png',
            padding: 10,
            cssVarMap: (sprite) => {
                sprite.name = 'ico-' + sprite.name;
            }
        }));

    spriteData.img.pipe(gulp.dest(config.img.sprite.img));
    spriteData.css.pipe(gulp.dest(config.img.sprite.css));
});

gulp.task('font', () => {
    gulp.src(config.font.src)
        .pipe(gulp.dest(config.font.dest));
});

gulp.task('clean', () => {
    return gulp.src(config.clean, {read: false})
        .pipe($.clean());
});

gulp.task('browser-sync', () => {

    browserSync.init({
        server: {
            baseDir: './public',
            middleware: [ historyApiFallback() ]
        },
        logLevel: 'info'
    });

    gulp.watch('./client/**/*.js', ['js']);
    gulp.watch('./client/**/*.html', ['template']);
    gulp.watch('./client/assets/styles/**/*.scss', ['sass']);
    gulp.watch('./client/*.html', ['html']).on('change', browserSync.reload);
});

gulp.task('default', ['build', 'browser-sync']);
gulp.task('build', () => {
    runSequence('html', 'js', 'template', 'vendor', 'sass', 'vendor-css', 'sprites', 'images', 'font');
});
