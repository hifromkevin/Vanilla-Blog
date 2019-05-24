var gulp = require('gulp');
var sass = require('gulp-sass');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./public/css/styles.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./public/css/styles.sass',  gulp.series('sass'));
});