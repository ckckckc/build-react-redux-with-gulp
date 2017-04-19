var dir    = require('./gulp-config.js').dir;
var eslint = require('gulp-eslint');
var gulp   = require('gulp');

module.exports = function() {
  return gulp.src(dir.src.js + '**/*.js')
          .pipe(eslint())
          .pipe(eslint.format())
          .pipe(eslint.failAfterError());
};