var babelify    = require('babelify');
var browserify  = require('browserify');
var buffer      = require('vinyl-buffer');
var dir         = require('./gulp-config.js').dir;
var del         = require('del');
var envify      = require('loose-envify');
var ENV         = require('./gulp-config.js').ENV;
var file        = require('./gulp-config.js').file;
var gulp        = require('gulp');
var handleError = require('./gulp-config.js').handleError;
var rev         = require('gulp-rev');
var source      = require('vinyl-source-stream');
var watchify    = require('watchify');

var ENV_FILE_PATH = process.env.NODE_ENV === ENV.PRODUCTION
                  ? ENV.PRODUCTION_PATH
                  : ENV.DEVELOPMENT_PATH;

require('dotenv').load({'path': ENV_FILE_PATH});

var bundler = browserify({
  'entries': dir.src.js + file.src.js, 
  'debug': process.env.NODE_ENV === ENV.DEVELOPMENT,
  'cache': {},
  'packageCache': {},
  'transform': [envify, babelify]
});

var watcher = process.env.NODE_ENV === ENV.PRODUCTION || watchify(bundler);

var task = function (){
  return watcher
          .bundle()
          .on('error', handleError)
          .pipe(source(file.dist.js))
          .pipe(buffer())
          .pipe(rev())
          .pipe(gulp.dest(dir.dist.js));
};

if (process.env.NODE_ENV === ENV.DEVELOPMENT) {
  watcher.on('update', function(e) {
    var start = Date.now();
    console.log('browserify update start... ', e);
    task.clean()
        .then(task);
    console.log('browserify update end after ', Date.now() - start + ' milliseconds');
  });
}

task.clean = function() {
  return del([
    dir.dist.js + '**/*',
  ]);
};

task.build = function () {
  return bundler
          .bundle()
          .on('error', handleError)
          .pipe(source(file.dist.js))
          .pipe(buffer())
          .pipe(gulp.dest(dir.dist.js));
};

module.exports = task;
