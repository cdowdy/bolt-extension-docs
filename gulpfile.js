var gulp = require('gulp');
var browserSync  = require('browser-sync').create();
var $    = require('gulp-load-plugins')();

var sassPaths = [
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src'
];

var pleeeaseOpt = {

    "mqpacker" : true
};



// Static Server + watching scss/html files
gulp.task('dev', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src('scss/main.scss')
        .pipe($.sass({
            includePaths: sassPaths,
            outputStyle: 'compressed' // if css compressed **file size**
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync .stream());
});

// clear up and remove unused styles
gulp.task( 'prod', function () {
    return gulp.src('css/main.css')
        .pipe($.uncss({
            html: ['index.html', 'docs-base.html']
        }))
        .pipe($.cssnano())
        .pipe(gulp.dest('./dist'))
});

gulp.task('default', ['dev'], function() {

    // gulp.watch(['.scss/**/*.scss'], ['sass']);
    // gulp.watch(['index.html']).on('change', browserSync .reload);
});
