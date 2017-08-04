//var gulp = require('gulp');
//var Server = require('karma').Server;
//
///**
// * Run test once and exit
// */
//gulp.task('test', function (done) {
//  new Server({
//    configFile: __dirname + '/karma.conf.js',
//    singleRun: true
//  }, done).start();
//});
//
///**
// * Watch for file changes and re-run tests on each change
// */
//gulp.task('tdd', function (done) {
//  new Server({
//    configFile: __dirname + '/karma.conf.js'
//  }, done).start();
//});
//
//gulp.task('default', ['tdd']);

//------------------------------------------------------------
/* gulp dependencies */
var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var minifyCSS = require('gulp-minify-css');
var lessDependents = require('gulp-less-dependents');
var clean = require('gulp-clean');
var concat_vendor = require('gulp-concat-vendor');
var jshint = require('gulp-jshint');
/* path def */
var path = {
  HTML: [
    'src/app/*.html',
    'src/app/**/*.html',
    //'src/views/*.html',
    //'src/favicon.png'
  ],
  JS: [
    'src/app/*.js',
    'src/app/**/*.js'
  ],
  CSS: [
    'src/assets/css/*.css'
  ],
  LESS: [
//    'src/less/style.less'
  ],
  LESS_ALL: [
//    'src/less/*.less'
  ],
  IMG: [
//    'src/img/**'
  ],
  VENDOR: [
    'node_modules/angular/angular.js',
//    'node_modules/angular-animate/angular-animate.js',
//    'node_modules/angular-aria/angular-aria.js',
//    'node_modules/angular-messages/angular-messages.js',
//    'node_modules/angular-sanitize/angular-sanitize.js',
    'node_modules/angular-ui-router/release/angular-ui-router.js'
    // ...and more
  ],
  DIST: './dist'
};
/* spin up distribution server */
gulp.task('connect', function() {
  connect.server({
                   root: 'dist',
                   port: 4005
                 });
});
/* clean up dist dir */
gulp.task('clean', function() {
  return gulp.src('./dist/*', {force: true})
    .pipe(clean());
});
/* jslint for debugging */
gulp.task('lint', function() {
  return gulp.src(path.JS)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
/* move css */
gulp.task('css', function () {
  gulp.src(path.CSS)
    .pipe(gulp.dest(path.DIST + '/css'));
});
/* compile less */
gulp.task('less', function () {
  gulp.src(path.LESS)
    .pipe(lessDependents())
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.DIST + '/css'));
});
/* concat and compress app scripts */
gulp.task('js', function () {
  gulp.src(path.JS)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.DIST + '/js'));
});
/* concat vendor dependencies */
gulp.task('vendor', function () {
  gulp.src(path.VENDOR)
    .pipe(concat('vendor.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(path.DIST + '/js'));
});
/* copy over markups */
gulp.task('html', function(){
  gulp.src(path.HTML, {base: 'src'})
    .pipe(gulp.dest(path.DIST));
});
/* compress images */
gulp.task('img', function(){
  gulp.src(path.IMG)
    .pipe(imagemin())
    .pipe(gulp.dest(path.DIST + '/img'));
});
/* watch all changes */
gulp.task('watch', function () {
  gulp.watch(path.LESS_ALL, ['less']);
  gulp.watch(path.VENDOR, ['vendor']);
  gulp.watch(path.JS, ['lint', 'js']);
  gulp.watch(path.HTML, ['html']);
  gulp.watch(path.IMG, ['img']);
});
/* defualt */
//gulp.task('default', all_tasks);
gulp.task('default',['clean', 'js', 'vendor', 'html', 'connect', 'watch']);
