'use strict';
let gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    del = require('del');

gulp.task('clean-temp', function(){
    return del(['js/es5']);
});

gulp.task('es6-commonjs',['clean-temp'], function(){
    return gulp.src(['js/es6/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('js/es5'))
        .pipe(livereload());
});

/*Compile Sass files*/
gulp.task('sass', ['clean-stylesheets'],function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('stylesheets'))
        .pipe(livereload());
});

gulp.task('clean-stylesheets', function(){
    return del(['stylesheets/*.css']);
});

/*Watch files for changes*/
gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('js/es6/*.js', ['es6-commonjs']);
    gulp.watch('scss/*.scss', ['sass']);

    gulp.watch('index.html').on('change', livereload.changed);
});

gulp.task('default',['es6-commonjs', 'sass', 'watch']);
gulp.watch('js/es6/*.js');