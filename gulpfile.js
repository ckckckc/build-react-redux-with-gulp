/** 
 * TODO: Jest
 * gulp 
 * (watch, script, sass, image-min).then(inject files, local server)
 *    with arguments:
 *    -r
 *    trigger livereload

 *    -l
 *    trigger linter when save


 * gulp build
 * (script-min, sass-min, image-min).then(inject files)
 */

var ARGS    = require('./gulpfiles/gulp-config.js').ARGS;
var dir     = require('./gulpfiles/gulp-config.js').dir;
var gulp    = require('gulp');
var html    = require('./gulpfiles/html.js');
var image   = require('./gulpfiles/image.js');
var sass    = require('./gulpfiles/sass.js');
var script  = require('./gulpfiles/script.js');
var server  = require('./gulpfiles/server.js');

gulp.task('sass-clean', sass.clean);
gulp.task('sass',     ['sass-clean'], sass);
gulp.task('sass-min', ['sass-clean'], sass.min);

gulp.task('server-start', server.start);

gulp.task('inject', html.inject);

gulp.task('image-del', image.del);
gulp.task('image-min', ['image-del'], image.min);

gulp.task('eslint', require('./gulpfiles/lint.js'));

gulp.task('script-clean', script.clean);
gulp.task('script',     ['script-clean'], script);
gulp.task('script-min', ['script-clean'], script.min);

gulp.task('watch', function() {
  if (process.argv.indexOf(ARGS.LINT) !== -1) {
    gulp.watch(dir.src.js + '**/*.js', ['eslint']);
  }

  if (process.argv.indexOf(ARGS.LIVE_RELOAD) !== -1) {
    gulp.watch(dir.dist.root + '**/*', server.reload);
  }

  gulp.watch(dir.src.sass   + '**/*.scss', ['sass']);
  gulp.watch(dir.src.images + '**/*', ['image-min']);
  gulp.watch(dir.dist.root  + '**/*', ['inject']);
});

gulp.task('default', ['watch', 'script', 'sass', 'image-min'], function() {
  gulp.start('inject');
  gulp.start('server-start');
});

gulp.task('build', ['script-min', 'sass-min', 'image-min'], html.inject);
