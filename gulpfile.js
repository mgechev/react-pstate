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
  return gulp.src('./lib/react-pstate.js')
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['test', 'copy'], function () {
  'use strict';
  return gulp.src('./dist/react-pstate.js')
    .pipe(uglify())
    .pipe(rename('react-pstate.min.js'))
    .pipe(gulp.dest('./dist'));
});
