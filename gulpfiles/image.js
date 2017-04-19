var dir         = require('./gulp-config.js').dir;
var del         = require('del');
var file        = require('./gulp-config.js').file;
var gulp        = require('gulp');
var handleError = require('./gulp-config.js').handleError;
var imagemin    = require('gulp-imagemin');

var image = {
  del: function() {
    return del([
      dir.dist.images + '**/*',
    ]);
  },
  min: function() {
    return gulp.src(dir.src.images + file.src.images, {
              base: dir.src.images
            })
          .pipe(imagemin())
          .on('error', handleError)
          .pipe(gulp.dest(dir.dist.images));
  },
};

module.exports = image;