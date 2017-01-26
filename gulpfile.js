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
    css:['./src/assets/css/style.css'],
    js:['./src/assets/js/lib/zepto.min.js','./src/assets/js/lib/pre-loader.js','./src/assets/js/lib/reqAnimate.js','./src/assets/js/rem.js','./src/assets/js/common.js','./src/assets/js/wxshare.js','./src/assets/js/home.js'],
    homejs:['./src/assets/js/lib/zepto.min.js','./src/assets/js/lib/pre-loader.js','./src/assets/js/lib/reqAnimate.js','./src/assets/js/rem.js','./src/assets/js/common.js','./src/assets/js/api.js','./src/assets/js/wxshare.js','./src/assets/js/home.js'],
    matchjs:['./src/assets/js/lib/zepto.min.js','./src/assets/js/lib/swiper.min.js','./src/assets/js/lib/pre-loader.js','./src/assets/js/lib/reqAnimate.js','./src/assets/js/rem.js','./src/assets/js/common.js','./src/assets/js/api.js','./src/assets/js/wxshare.js','./src/assets/js/match.js'],
    reservationjs:['./src/assets/js/lib/zepto.min.js','./src/assets/js/lib/pre-loader.js','./src/assets/js/rem.js','./src/assets/js/common.js','./src/assets/js/api.js','./src/assets/js/wxshare.js','./src/assets/js/reservation.js'],
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
gulp.task('scripts_home',['clean'], function() {
    return gulp.src(path.homejs)
        .pipe(concat('all_home.js'))
        .pipe(gulp.dest('./src/dist'))
        .pipe(rename('all_home.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/dist/js'));
});

//match
gulp.task('scripts_match',['clean'], function() {
    return gulp.src(path.matchjs)
        .pipe(concat('all_match.js'))
        .pipe(gulp.dest('./src/dist'))
        .pipe(rename('all_match.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/dist/js'));
});

//reservation
gulp.task('scripts_reservation',['clean'], function() {
    return gulp.src(path.reservationjs)
        .pipe(concat('all_reservation.js'))
        .pipe(gulp.dest('./src/dist'))
        .pipe(rename('all_reservation.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/dist/js'));
});

// Concatenate & Minify
gulp.task("tinypng", function(){
    gulp.src(['./src/assets/images/*.{png,jpg,jpeg}','./src/assets/images/*/*.{png,jpg,jpeg}','./src/assets/images/*/*/*.{png,jpg,jpeg}'])
        .pipe(tinypng({
            key: '-ID8TBnbSlRuMCc_mMagta65Q7IDyaQ-',
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
    gulp.watch(path.homejs,['scripts_home']);
    gulp.watch(path.matchjs,['scripts_match']);
    gulp.watch(path.reservationjs,['scripts_reservation']);
});

// Default Task
gulp.task('default', ['compressCss','watch','scripts_home','scripts_match','scripts_reservation','browser-sync']);

