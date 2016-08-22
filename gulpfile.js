var gulp = require('gulp'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    useref = require('gulp-useref'),
    uncss = require('gulp-uncss'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    gutil = require('gulp-util'),
    filesize = require('gulp-filesize'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    historyApiFallback = require('connect-history-api-fallback'),
    templateCache = require('gulp-angular-templatecache'),
    config = require('./gulp.config.json'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    vinylSourceStream = require('vinyl-source-stream'),
    vinylBuffer = require('vinyl-buffer');

gulp.task('vendor', function() {
    gulp.src(config.scripts.vendor)
        .pipe(concat('vendor.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(config.scripts.dest))
        .pipe(filesize())
        .on('error', gutil.log)
});

//gulp.task('js', function() {
//    gulp.src(config.scripts.src)
//        .pipe(babel({
//            presets: ['es2015']
//        }))
//        .pipe(concat('build.js'))
//        //.pipe(uglify())
//        .pipe(ngAnnotate())
//        .pipe(filesize())
//        .pipe(gulp.dest(config.scripts.dest))
//        .pipe(browserSync.stream())
//        .on('error', gutil.log)
//});

/* Compile all script files into one output minified JS file. */
gulp.task('js', function() {
    var sources = browserify({
        entries: './client/app/app.module.js',
        debug: true // Build source maps
    })
    .transform(babelify.configure({
        presets: ["es2015"]
    }));

    /* TODO configure sourcemaps */

    return sources.bundle()
        .pipe(vinylSourceStream(config.scripts.src[1]))
        .pipe(vinylBuffer())
        .pipe(ngAnnotate())
        .pipe(sourcemaps.init({
            loadMaps: true // Load the sourcemaps browserify already generated
        }))
        //.pipe(plugins.uglify())
        .pipe(sourcemaps.write('./', {
            includeContent: true
        }))
        .pipe(concat('build.js'))
        //.pipe(uglify())
        .pipe(filesize())
        .pipe(gulp.dest(config.scripts.dest))
        .pipe(browserSync.stream())
        .on('error', gutil.log)

});

gulp.task('sass', function() {
    gulp.src(config.sass.src)
        .pipe(sass())
        .pipe(concatCss("build.css"))
        //.pipe(uncss({
        //    html: [config.html.src]
        //}))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: false
        }))
        .pipe(filesize())
        .pipe(gulp.dest(config.sass.dest))
        .pipe(browserSync.stream())
});

gulp.task('vendor-css', function() {
    gulp.src(config.css.vendor)
        .pipe(concatCss("vendor.css"))
        //.pipe(uncss({
        //    html: [config.html.src]
        //}))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: false
        }))
        .pipe(filesize())
        .pipe(gulp.dest(config.css.dest))
});

gulp.task('html', function() {
    gulp.src(config.html.src)
        .pipe(useref())
        .pipe(filesize())
        .pipe(gulp.dest(config.html.dest));
});

gulp.task('template', function() {
    gulp.src(config.templateCache)
        .pipe(templateCache('templates.js', {
            standalone: true
        }))
        .pipe(filesize())
        .pipe(gulp.dest(config.html.dest_templates))
        .pipe(browserSync.stream());
});

// gulp.spritesmith
gulp.task('sprite', function() {
    gulp.src(config.img.src)
        .pipe(imagemin({
            progressive: true, //jpg
            optimizationLevel: 0 // png (0-7)
        }))
        .pipe(filesize())
        .pipe(gulp.dest(config.img.dest));
});

gulp.task('font', function() {
    gulp.src(config.font.src)
        .pipe(gulp.dest(config.font.dest));
});

gulp.task('clean', function () {
    return gulp.src('public', {read: false})
        .pipe(clean());
});

// Static server
gulp.task('browser-sync', function() {

    browserSync.init({
        server: {
            baseDir: './public',
            middleware: [ historyApiFallback() ]
        },
        logLevel: 'info'
    });

    gulp.watch('./client/**/*.js', ['js']);
    gulp.watch('./client/assets/styles/styles.scss', ['sass']);
    //gulp.watch('./client/assets/styles/styles.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('./client/**/*.html', ['template', 'html']).on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync']);
gulp.task('build', ['js', 'template', 'vendor', 'sass', 'vendor-css', 'html', 'font', 'sprite', 'default']);

