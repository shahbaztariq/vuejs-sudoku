/**
 * requires
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var rjs  = require('gulp-requirejs');

/**
 * default task
 */
gulp.task('default', ['js', 'css']);

/**
 * css task
 */
gulp.task('css', function () {
    
    var options = {
        outputStyle: 'compressed'
    };
    
    gulp.src('css/**/*.scss').pipe(sass(options)).pipe(gulp.dest('./dist/'));
});

/**
 * js task
 */
gulp.task('js', function () {
    
    var options = {
        'name'    : 'app',
        'baseUrl' : 'js',
        'out'     : 'app.js',
        'paths'   : {
            'app'       : 'app',
            'vue'       : '../bower_components/vue/dist/vue.min',
            'jquery'    : '../bower_components/jquery/dist/jquery.min'
        }  
    };
    
    rjs(options).pipe(gulp.dest('./dist/'));
});

/**
 * watch task
 */
gulp.task('watch', function () {
    gulp.watch('js/**/*.js', ['js']);
    gulp.watch('css/**/*.scss', ['css']);
})
