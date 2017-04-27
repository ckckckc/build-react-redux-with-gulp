var dir     = require('./gulp-config.js').dir;
var gulp      = require('gulp');
var file    = require('./gulp-config.js').file;
var path      = require('path');
var useref    = require('gulp-useref');
var gulpif    = require('gulp-if');
var uglify    = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var RevAll    = require('gulp-rev-all');
var del       = require('del');

var task = {
  'del-public': function() {
    del([
      dir.public.root
    ]);
  },
  'del-temp': function() {
    del([
      dir.temp.root
    ]);
  },
  'del-dist-js-css-html': function() {
    del([
      dir.dist.css,
      dir.dist.js,
      dir.dist.root + file.dist.html
    ]);
  },
  'combine-into-temp': function() {
      return gulp.src(dir.dist.root + file.dist.html)
          .pipe(useref({searchPath: [dir.dist.root]}))
          .pipe(gulpif('*.js', uglify()))
          .pipe(gulpif('*.css', minifyCss()))
          .pipe(gulp.dest(dir.temp.root));
  },
  'move-to-public': function() {
      return gulp.src([dir.temp.js + file.temp.js, dir.temp.css + file.temp.css, dir.temp.root + file.temp.html])
          .pipe(RevAll.revision({
            transformFilename: function(file, hash) {
              var ext = path.extname(file.path);
              if (ext === '.html') {
                return path.basename(file.path, ext) + ext;
              }
              return path.basename(file.path, ext) + '.'  + hash.substr(0, 5) + ext;
            }
          }))
          .pipe(gulp.dest(dir.public.root));
  },
};

module.exports = task;