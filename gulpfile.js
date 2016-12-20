var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

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

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
