var autoprefixer = require('gulp-autoprefixer');
var babelify    = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var del = require('del');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var rev = require('gulp-rev');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

var file = {
  'src': {
    'js': 'index.js',
    'sass': 'style.scss',
    'html': 'index.html',
  },
  'dist': {
    'js': 'bundle.js',
    'sass': 'bundle.css',
    'html': 'index.html',
  }
};

var dir = {
  'src': {
    'js': 'src/js/',
    'sass': 'src/sass/',
    'html': 'src/'
  },
  'dist': {
    'root': 'dist/',
    'js': 'dist/js/',
    'css': 'dist/css/'
  },
  'ignorePath': 'dist',
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

var injectFiles = function() {
  var target = gulp.src(dir.src.html + file.src.html);
  var sources = gulp.src([
                  dir.dist.js  + '*.js', 
                  dir.dist.css + '*.css'
                ], 
                {read: false});
  return target
          .pipe(inject(sources, {'ignorePath': dir.ignorePath}))
          .pipe(gulp.dest(dir.dist.root));
};

var injectThenReload = function(){
  return injectFiles()
          .pipe(connect.reload());
};

var rmFiles = function(path) {
  console.log('del ' +  path + '**/*' + ' start');
  del([
    path + '**/*',
  ]);
  console.log('del ' +  path + '**/*' + ' end');
};

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

gulp.task('eslint', function() {
  return gulp.src(dir.src.js + '**/*.js')
          .pipe(eslint())
          .pipe(eslint.format())
          .pipe(eslint.failAfterError());
});

gulp.task('inject', injectFiles);

gulp.task('inject-then-reload', injectThenReload);

gulp.task('server-start', function() {
  connect.server({
    root: dir.dist.root,
    livereload: true,
    fallback: dir.dist.root + file.dist.html
  });
});

gulp.task('sass', function () {
  rmFiles(dir.dist.css);

  return gulp.src(dir.src.sass + file.src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(prefixerOptions))
    .pipe(rev())
    .pipe(gulp.dest(dir.dist.css));
});

gulp.task('sass-production', function(){
  rmFiles(dir.dist.css);

  return gulp.src(dir.src.sass + file.src.sass)
    .pipe(sass(sassProductionOptions).on('error', sass.logError))
    .pipe(autoprefixer(prefixerProductionOptions))
    .pipe(rev())
    .pipe(gulp.dest(dir.dist.css));
});


gulp.task('script', function () {
  var watcher = watchify(bundler.dev);

  var bundleWatcher = function (watcher) {
    rmFiles(dir.dist.js);

    return watcher
            .bundle()
            .on('error', handleError)
            .pipe(source(file.dist.js))
            .pipe(buffer())
            .pipe(rev())
            .pipe(gulp.dest(dir.dist.js));
  };

  watcher.on('update', function(e) {
    var start = Date.now();
    console.log('browserify update start... ', e);
    bundleWatcher(watcher);
    console.log('browserify update end after ', Date.now() - start + ' milliseconds');
  });

  return bundleWatcher(watcher);
});

gulp.task('script-production', function () {
  rmFiles(dir.dist.js);

  return bundler.production
          .bundle()
          .on('error', handleError)
          .pipe(source(file.dist.js))
          .pipe(buffer())
          .pipe(uglify())
          .pipe(rev())
          .pipe(gulp.dest(dir.dist.js));
});

gulp.task('watch', function(){
  gulp.watch(dir.src.sass  + '**/*.scss', ['sass']);
  gulp.watch(dir.src.js    + '**/*.js', ['eslint']);
  gulp.watch(dir.dist.root + '**/*', ['inject-then-reload']);
});

gulp.task('default', ['server-start', 'sass', 'script', 'eslint', 'watch']);
gulp.task('production', ['script-production', 'sass-production'], injectFiles);