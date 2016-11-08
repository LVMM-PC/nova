var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');

gulp.task('default', function () {
    console.log('use gulp sass to run');
});

gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
});
