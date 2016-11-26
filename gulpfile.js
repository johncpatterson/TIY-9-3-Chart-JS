'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const notify = require("gulp-notify");
const plumber = require('gulp-plumber');

// const babel = require('gulp-babel');
// const eslint = require('gulp-eslint');
// const notify = require("gulp-notify");

// gulp.task('lint', () => {
//     return gulp.src(['js/*.js', '!node_modules/**'])
//         .pipe(eslint())
//         .pipe(eslint.format())
//         .pipe(eslint.failAfterError())
//         .on("error", notify.onError('Error!'));
// });

// gulp.task('babel', () => {
//     return gulp.src('js/*.js')
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         .pipe(gulp.dest('dist'));
// });

gulp.task('sass', function() {
   return gulp.src('./sass/*.scss')
      .pipe(sass().on('error', function() {
         notify("You have a Sass error").write('');
      }))
      .pipe(plumber({
         errorHandler: notify.onError('Error: <%= error.message %>')
      }))
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.reload({
         stream: true
      }))
});

gulp.task('browserSync', function() {
   browserSync.init({
      server: {
         baseDir: ''
      },
   })
})

// gulp.src("./src/test.ext")
//   .pipe(notify("Hello Gulp!"));

gulp.task('watch', ['browserSync', 'sass', 'notify'], function() {
   gulp.watch(['*.html', './js/*.js', './sass/*.scss'], ['sass']);
});
