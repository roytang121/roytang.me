'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');

gulp.task('scss', function() {
  return gulp.src('./public/stylesheets/style.scss')
    .pipe(sass({
      includePaths: [
        './bower_components/foundation-sites/scss'
      ]
    }).on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest("./public/stylesheets"));
});

gulp.task('watch:scss', function() {
  return gulp.watch('./public/**/*.scss', ['scss']);
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    port: 7000,
    notify: true
  });
});

gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: './bin/www'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true;
		}
	});
});


gulp.task('default', ['scss', 'browser-sync'], function() {
  gulp.watch('./public/**/*.scss', ['scss']);
  gulp.watch('./views/**/*.html', browserSync.reload);
  gulp.watch('./views/**/*.jade', browserSync.reload);
  gulp.watch('./public/**/*.css', browserSync.reload);
});
