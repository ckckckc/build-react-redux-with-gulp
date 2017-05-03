var dir         = require('./gulp-config.js').dir;
var del         = require('del');
var file        = require('./gulp-config.js').file;
var gulp        = require('gulp');
var handleError = require('./gulp-config.js').handleError;
var imagemin    = require('gulp-imagemin');

var task = {
  del: function() {
    return del([
      dir.dist.images + '**/*',
    ]);
  },
  'del-build': function() {
    return del([
      dir.public.root + '**/*',
    ]);
  },
  dev: function() {
    return gulp.src(dir.src.images + file.src.images, {
              base: dir.src.images
            })
          .pipe(imagemin())
          .on('error', handleError)
          .pipe(gulp.dest(dir.dist.images));
  },
  build: function() {
    return gulp.src(dir.src.images + file.src.images, {
              base: dir.src.images
            })
          .pipe(imagemin())
          .on('error', handleError)
          .pipe(gulp.dest(dir.public.images));
  },
};

module.exports = task;