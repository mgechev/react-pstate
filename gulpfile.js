var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jest = require('gulp-jest');
var rename = require('gulp-rename');

gulp.task('test', function () {
  'use strict';
  return gulp.src('./lib/__tests__')
    .pipe(jest());
});

gulp.task('copy', function () {
  'use strict';
  return gulp.src('./lib/react-persistent.js')
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['test', 'copy'], function () {
  'use strict';
  return gulp.src('./dist/react-peristent.js')
    .pipe(uglify())
    .pipe(rename('react-persistent.min.js'))
    .pipe(gulp.dest('./dist'));
});
