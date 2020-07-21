'use strict';

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    rev = require('gulp-rev'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');
   
gulp.task('sass', () => {
    return gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});
    
gulp.task('sass:watch', () => {
    gulp.watch('./css/*.scss', gulp.series('sass'));
});
    
gulp.task('browser-sync', () => {
    let files = [
    './*.html',
    './css/*.css',
    './img/*.{png,jpg,gif}',
    './js/*.js'
    ];

    browserSync.init(files, {
    server: {
        baseDir: "./"
    }});
});

// Default task
gulp.task('default', gulp.parallel('browser-sync','sass:watch'));  

gulp.task('clean', () => {
    return del(['dist']);
});

gulp.task('copyfonts', () => {
   gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eot,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imagemin', () => {
    return gulp.src('img/*.{png,jpg,gif}')
      .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
      .pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', () => {
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream, file){
        return stream
          .pipe(usemin({
              css: [ rev() ],
              html: [ () => { return htmlmin({ collapseWhitespace: true })} ],
              js: [ uglify(), rev() ],
              inlinejs: [ uglify() ],
              inlinecss: [ cleanCss(), 'concat' ]
          }))
      }))
      .pipe(gulp.dest('dist/'));
});
  
gulp.task('build', gulp.parallel('clean',['copyfonts','imagemin','usemin']));  
