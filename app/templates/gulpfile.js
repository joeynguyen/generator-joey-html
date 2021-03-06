// Include gulp
var gulp = require('gulp');

// Include our Plugins
var clean       = require('gulp-clean'),
    concat      = require('gulp-concat'),
    filesize    = require('gulp-size'),
    gutil       = require('gulp-util'),
    imagemin    = require('gulp-imagemin'),
    pngcrush    = require('imagemin-pngcrush'),
    newer       = require('gulp-newer'),
    jshint      = require('gulp-jshint'),
    livereload  = require('gulp-livereload'),
    minifycss   = require('gulp-minify-css'),
    rename      = require('gulp-rename'),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify');

// Compile our Sass
gulp.task('sass', function() {
    return gulp.src('src/css/style.scss')
        .pipe(sass({
            includePaths: ['src/css'],
            imagePath: ['../images'],
        }))
        .pipe(gulp.dest('css'))
        .pipe(filesize({showFiles: true}))
        .pipe(rename('style.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('css'))
        .pipe(filesize({showFiles: true}))
        .on('error', gutil.log);
});

// gulp.task('sass-bootstrap', function() {
//     return gulp.src('src/bootstrap/sass/bootstrap.scss')
//         .pipe(sass({
//             includePaths: ['src/bootstrap/sass']
//         }))
//         .pipe(gulp.dest('css'))
//         .pipe(filesize({showFiles: true}))
//         .pipe(rename('bootstrap.min.css'))
//         .pipe(minifycss())
//         .pipe(gulp.dest('css'))
//         .pipe(filesize({showFiles: true}))
//         .on('error', gutil.log);
// });

// Lint, Concatenate, and Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js'))
        .pipe(filesize({showFiles: true}))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
        .pipe(filesize({showFiles: true}))
        .on('error', gutil.log);
});

// Watch files for changes
gulp.task('watch', function() {
    var server = livereload();
    var reload = function(file) {
        server.changed(file.path);
    };
    gulp.watch('src/css/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['images']);
    gulp.watch(['css/**','js/**']).on('change', reload);
});

// Minify images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(newer('images'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('images'))
        .pipe(filesize({showFiles: true}))
        .on('error', gutil.log);
});

// Default Task
gulp.task('default', ['watch']);
gulp.task('build', ['sass', 'scripts', 'images']);
// gulp.task('build', ['sass', 'sass-bootstrap', 'scripts', 'images']);
