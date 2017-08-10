var gulp = require('gulp');
var sass = require('gulp-sass');
const PATH_CONFIG = require('./svnPath.js');

gulp.task('default', ['sass'], function () {
    console.log('use gulp sass to run');
});

gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('toPic', ['sass'], function () {
    gulp.src('js/**/*.js')
        .pipe(gulp.dest(PATH_CONFIG.picSvnPath + '/js' + PATH_CONFIG.projectPath));
    gulp.src('assets/css/**/*.css')
        .pipe(gulp.dest(PATH_CONFIG.picSvnPath + '/styles' + PATH_CONFIG.projectPath));
});
