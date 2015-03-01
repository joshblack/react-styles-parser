'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('babel', function () {
    return gulp.src('./src/parser.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
    gulp.watch('./src/**/*.js', ['babel']);
});