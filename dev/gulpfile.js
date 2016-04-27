

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    gzip = require('gulp-gzip'),
    livereload = require('gulp-livereload'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    del = require('del');

var gzip_options = {
    threshold: '1kb',
    gzipOptions: {
        level: 9
    }
};

/*Compile Sass files*/
gulp.task('sass', ['clean-stylesheets'],function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('stylesheets'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('stylesheets'))
        .pipe(gzip(gzip_options))
        .pipe(gulp.dest('stylesheets'))
        .pipe(livereload());
});

gulp.task('clean-stylesheets', function(){
    return del(['stylesheets/*.css']);
});


/*Watch files for changes*/
gulp.task('watch', function(){
    livereload.listen();
   // gulp.watch('components/es2015/*.js', ['es6-commonjs']);
    gulp.watch('scss/*.scss', ['sass']);

    gulp.watch('index.html').on('change', livereload.changed);
});

//gulp.task('default',['es6-commonjs', 'sass', 'watch']);
gulp.task('default',['sass', 'watch']);
//gulp.watch('components/es2015/*.js');