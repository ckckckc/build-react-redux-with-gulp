var babelify    = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

var file = {
  'src': {
    'js': 'index.js',
  },
  'dist': {
    'js': 'bundle.js',
  }
};

var dir = {
  'src': {
    'js': './src/js/'
  },
  'dist': {
    'root': './dist/',
    'js': './dist/js/'
  }
};

var bundler = {
  dev: browserify({
    'entries': dir.src.js + file.src.js, 
    'debug': true,
    'cache': {},
    'packageCache': {},
    'transform': babelify
  }),
  production: browserify({
    'entries': dir.src.js + file.src.js, 
    'debug': false,
    'transform': babelify
  })
};

var handleError = function(err) { 
  console.error(err); this.emit('end'); 
};

gulp.task('server-start', function() {
  connect.server({
    root: dir.dist.root,
    livereload: true
  });
});

gulp.task('script', function () {
  var watcher = watchify(bundler.dev);

  var bundleWatcher = function (watcher) {
    return watcher
            .bundle()
            .on('error', handleError)
            .pipe(source(file.dist.js))
            .pipe(gulp.dest(dir.dist.js))
            .pipe(connect.reload());
  };

  watcher.on('update', function(e) {
    var start = Date.now();
    console.log('browserify update start... ', e);
    bundleWatcher(watcher);
    console.log('browserify update end after ', Date.now() - start + ' milliseconds');
  })

  return bundleWatcher(watcher);
});


gulp.task('script-production', function () {
  return bundler.production
          .bundle()
          .on('error', function(err) { 
            console.error(err); this.emit('end'); 
          })
          .pipe(source(file.dist.js))
          .pipe(buffer())
          .pipe(uglify())
          .pipe(gulp.dest(dir.dist.js));
});

gulp.task('default', ['server-start', 'script']);

gulp.task('production', ['script-production']);