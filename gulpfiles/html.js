var dir    = require('./gulp-config.js').dir;
var file   = require('./gulp-config.js').file;
var gulp   = require('gulp');
var inject = require('gulp-inject');

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
          .pipe(inject(sources, {'ignorePath': '/dist'}))
          .pipe(gulp.dest(dir.dist.root));
};