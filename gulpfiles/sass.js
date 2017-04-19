var autoprefixer = require('gulp-autoprefixer');
var del          = require('del');
var gulp         = require('gulp');
var rev          = require('gulp-rev');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var dir          = require('./gulp-config.js').dir;
var file         = require('./gulp-config.js').file;

var sassOptions = {
  'includePaths': [dir.src.sass], 
};

var sassProductionOptions = {
  'includePaths': [dir.src.sass], 
  'outputStyle': 'compressed'
};

var prefixerOptions = {
  'browsers': ['Last 1 versions'],
  'cascade': true
};
var prefixerProductionOptions = {
  'browsers': ['Last 4 versions'],
  'cascade': false
};

var task = function() {
  return gulp.src(dir.src.sass + file.src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(prefixerOptions))
    .pipe(rev())
    .pipe(gulp.dest(dir.dist.css));
};

task.clean = function() {
  return del([
    dir.dist.css + '**/*',
  ]);
};

task.min = function() {
  return gulp.src(dir.src.sass + file.src.sass)
    .pipe(sass(sassProductionOptions).on('error', sass.logError))
    .pipe(autoprefixer(prefixerProductionOptions))
    .pipe(rev())
    .pipe(gulp.dest(dir.dist.css));
};

module.exports = task;
