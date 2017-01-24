// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename'),
    del = require('del'),
    browserSync = require('browser-sync').create();
var tinypng = require('gulp-tinypng-compress');

//Define the app path
var path = {
    all:['./template/*.html','./src/assets/css/*.css','./src/dist/css/*.css','./src/assets/js/*.js','./src/assets/js/lib/*.js'],
    template:['./template/*.html'],
    css:['./src/assets/css/*.css'],
    js:['./src/assets/js/lib/zepto.min.js','./src/assets/js/lib/pre-loader.js','./src/assets/js/lib/reqAnimate.js','./src/assets/js/rem.js','./src/assets/js/common.js','./src/assets/js/wxshare.js','./src/assets/js/home.js'],
    images:['./src/assets/images/*','./src/assets/images/*/*'],
};
// Browser-sync
gulp.task('browser-sync', function() {
    browserSync.init(path.all,{
        server: {
            baseDir: "./",
            startPath: ''
        }
    });
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['build']);
});


//css
gulp.task('compressCss',['clean'],function () {
    // 1. 找到文件
    gulp.src(path.css)
        //.pipe(concat('style.css'))
        // 2. 压缩文件
        .pipe(minify())
        // 3. 另存为压缩文件
        .pipe(gulp.dest('./src/dist/css'));
});

// Concatenate & Minify
gulp.task('scripts',['clean'], function() {
    return gulp.src(path.js)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./src/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/dist/js'));
});

// Concatenate & Minify
gulp.task("tinypng", function(){
    gulp.src(['./src/assets/images/*.{png,jpg,jpeg}','./src/assets/images/*/*.{png,jpg,jpeg}','./src/assets/images/*/*/*.{png,jpg,jpeg}'])
        .pipe(tinypng({
            key: 'gTeMTlJN2nqY3weeN-cLO83uI6cLaicE',
            sigFile: './src/.tinypng-sigs',
            log: true
        })).on('error', function(err) {
            console.error(err.message);
        })
        .pipe(gulp.dest('./src/dist/images/'));
});


// Watch Files For Changes
gulp.task('watch',function() {
    gulp.watch(path.css,['compressCss']);
    gulp.watch(path.js,['scripts']);
});

// Default Task
gulp.task('default', ['compressCss','tinypng','scripts','watch','browser-sync']);

