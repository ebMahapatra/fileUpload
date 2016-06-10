'use strict';
const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const minifycss = require('gulp-minify-css');
const livereload = require('gulp-livereload');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const del = require('del');

gulp.task('clean-temp', () => del(['js/es5']) 
);

gulp.task('es6-commonjs',['clean-temp'], () => 
    gulp.src(['js/es6/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('js/es5'))
        .pipe(livereload())
);

/*Compile Sass files*/
gulp.task('sass', ['clean-stylesheets'],() =>
    gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('stylesheets'))
        .pipe(livereload())
);

gulp.task('clean-stylesheets', () => del(['stylesheets/*.css'])
);

/*Watch files for changes*/

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch('js/es6/*.js', ['es6-commonjs']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('index.html').on('change', livereload.changed);
});

gulp.task('default',['es6-commonjs', 'sass', 'watch']);
gulp.watch('js/es6/*.js');