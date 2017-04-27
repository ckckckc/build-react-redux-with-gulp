var dir     = require('./gulp-config.js').dir;
var file    = require('./gulp-config.js').file;
var gulp    = require('gulp');
var inject  = require('gulp-inject');
var wiredep = require('wiredep').stream;

exports.inject = function() {
  var sources = gulp.src(
        [
          dir.dist.js  + '*.js', 
          dir.dist.css + '*.css'
        ], 
        {
          read: false
        }
      );

  return gulp.src(dir.src.html + file.src.html)
          .pipe(wiredep({'ignorePath': dir.bowerIgnorePath}))
          .pipe(inject(sources, {'ignorePath': dir.injectIgnorePath}))
          .pipe(gulp.dest(dir.dist.root));
};