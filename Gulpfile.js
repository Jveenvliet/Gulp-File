var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var del = require('del');

// clean complete dist folder
gulp.task('cleandist', function(cb) {
    del([
        './dist/**/'
    ], cb);
});

// clean complete css folder
gulp.task('cleancss', function(cb) {
    del([
        './dist/css/**/'
    ], cb);
});

// clean complete js folder
gulp.task('cleanjs', function(cb) {
    del([
        './dist/js/**/'
    ], cb);
});

// whats happening here:
// 1. clean all css files
// 2. sass to css conversion
// 3. minify css
// 4. add sourcemap reference
// 5. write new css to dist folder 
gulp.task('sass',['cleancss'], function () {
    gulp.src('./css/core.scss')
    	.pipe(sourcemaps.init())
        .pipe(sass({
        	includePaths: [
                './node_modules/susy/sass' //required for sass
            ]
        }))
       // .pipe(minifyCSS({keepBreaks:false}))
        .pipe(rename('core.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
});

// whats happening here:
// 1. clean all js files
// 2. concat all js files to one (minify)
// 3. place bundle js to dist folder
// 4. uglify bundle js
// 5. add sourcemap reference
// 6. write new js to dist folder 
gulp.task('scripts',['cleanjs'], function () {
    gulp.src('./js/*.js')
    	.pipe(sourcemaps.init())
    	.pipe(concat('bundle.js'))
    	.pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'));
});

// wahts happening here:
// 1. fire scripts taks + start watching for edits
// 2. fire sass taks + start watching for edits
gulp.task('watch', function () {
    gulp.watch('./js/**/*.js', ['scripts']);	
    gulp.watch('./css/**/*.scss', ['sass']);
});

// default task that will run after activating gulp
gulp.task('default', ['sass', 'scripts'], function() {

});