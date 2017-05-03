var ARGS    = require('./gulp-config.js').ARGS;
var connect = require('gulp-connect');
var dir     = require('./gulp-config.js').dir;
var file    = require('./gulp-config.js').file;
var gulp    = require('gulp');


var task = {
  'start': function() {
    connect.server({
      root: dir.dist.root,
      livereload: process.argv.indexOf(ARGS.LIVE_RELOAD) !== -1,
      fallback: dir.dist.root + file.dist.html
    });
  },
  'server-build': function() {
    connect.server({
      root: dir.public.root,
      fallback: dir.public.root + file.public.html
    });
  },
  'reload': function(){
    return gulp.src(dir.dist.root + file.dist.html)
            .pipe(connect.reload());
  },
};

module.exports = task;

