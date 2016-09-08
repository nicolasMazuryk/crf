require('babel-register');

'use strict';

import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import gulpLoadPlugins from 'gulp-load-plugins';
import vinylSourceStream from 'vinyl-source-stream';
import browserSync from 'browser-sync';
import vinylBuffer from 'vinyl-buffer';
import runSequence from 'run-sequence';
import autoprefixer from 'autoprefixer';
import historyApiFallback from 'connect-history-api-fallback';
import config from './gulp.config.json';
import { argv } from 'yargs';

const
    $ = gulpLoadPlugins({lazy: true}),
    prod = argv.production;

gulp.task('js', () => {
    let sources = browserify({
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
            loadMaps: true
        })))
        .pipe($.concat('bundle.js'))
        .pipe($.ngAnnotate())
        .pipe($.if(prod, $.uglify()))
        .pipe($.if(!prod, $.sourcemaps.write('.', {
            includeContent: true
        })))
        .pipe(gulp.dest(config.scripts.dest))
        .pipe(browserSync.stream())
        .on('error', $.util.log)
});

gulp.task('vendor', () => {
    return gulp.src(config.scripts.vendor)
        .pipe($.concat('vendor.js'))
        .pipe($.if(prod, $.uglify()))
        .pipe(gulp.dest(config.scripts.dest))
});

gulp.task('template', () => {
    return gulp.src(config.templateCache)
        .pipe($.angularTemplatecache('templates.js', {
            standalone: true
        }))
        .pipe(gulp.dest(config.html.dest_templates))
        .pipe(browserSync.stream())
});

gulp.task('sass', () => {
    return gulp.src(config.sass.src)
        .pipe($.if(!prod, $.sourcemaps.init()))
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe($.if(prod, $.csso()))
        .pipe($.if(!prod, $.sourcemaps.write()))
        .pipe(gulp.dest(config.sass.dest))
        .pipe(browserSync.stream())
});

gulp.task('vendor-css', () => {
    return gulp.src(config.css.vendor)
        .pipe($.concatCss("vendor.css"))
        .pipe($.postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe($.if(prod, $.csso()))
        .pipe(gulp.dest(config.css.dest))
});

gulp.task('html', () => {
    return gulp.src(config.html.src)
        .pipe($.plumber())
        .pipe($.if(prod, $.useref({
            searchPath: './public/'
        })))
        .pipe(gulp.dest(config.html.dest))
});

gulp.task('images', () => {
    return gulp.src(config.img.src)
        .pipe($.imagemin({
            progressive: true, //jpg
            optimizationLevel: 1 // png (0-7)
        }))
        .pipe(gulp.dest(config.img.dest))
});

gulp.task('sprites', () => {
    let spriteData = gulp.src(config.img.sprite.src)
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

    return spriteData.img.pipe(gulp.dest(config.img.sprite.img)).on('end', () => {
        spriteData.css.pipe(gulp.dest(config.img.sprite.css));
    });
});

gulp.task('font', () => {
    return gulp.src(config.font.src)
        .pipe(gulp.dest(config.font.dest));
});

gulp.task('clean', () => {
    return gulp.src(config.clean, {read: false})
        .pipe($.if(prod, $.clean()));
});

gulp.task('browser-sync', () => {
    if (prod) return;

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

gulp.task('default', () => {
    runSequence('js', 'template', 'vendor', 'sass', 'vendor-css', 'html', 'sprites', 'images', 'font', 'clean', 'browser-sync');
});
