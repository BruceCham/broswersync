var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var connect = require('gulp-connect');
// 方法1 通过browser启动静态服务器
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: {
        	// 指定静态目录
        	baseDir: "./app",
        	// 自动打开指定的文件
        	index: "home.html"
        },
        // 指定服务器端口
        port: 8082
    });
    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// 方法2 通过browser监听其它的服务器
// gulp.task('server', function() {
//     connect.server({
//         root: './',
//         port: 8090
//     });
// });
// gulp.task('default',['server'],function(){
//     browserSync.init({
//         proxy: 'http://localhost:8090',
//         port: 3001
//     });
//     gulp.watch("app/scss/*.scss").on('change',function(e){
//         return gulp.src("app/scss/*.scss")
//             .pipe(sass())
//             .pipe(gulp.dest("app/css"))
//             .pipe(browserSync.stream());
//     });
// });



// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

