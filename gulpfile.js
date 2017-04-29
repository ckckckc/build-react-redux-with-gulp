/** 
 * gulp 
 * (watch, script, sass, image-min).then(inject files, local server)
 *    with arguments:
 *    -r
 *    trigger livereload

 *    -l
 *    trigger linter when save

 * gulp build
 * compile react code, inject bower deps to dist
 * combine all js/css file into ./temp from ./dist
 * js/css file will be added hash name and moved to ./public

 */

var ARGS     = require('./gulpfiles/gulp-config.js').ARGS;
var build    = require('./gulpfiles/build.js');
var dir      = require('./gulpfiles/gulp-config.js').dir;
var gulp     = require('gulp');
var gulpSync = require('gulp-sync')(gulp);
var html     = require('./gulpfiles/html.js');
var image    = require('./gulpfiles/image.js');
var sass     = require('./gulpfiles/sass.js');
var script   = require('./gulpfiles/script.js');
var server   = require('./gulpfiles/server.js');

gulp.task('sass-clean', sass.clean);
gulp.task('sass', ['sass-clean'], sass);
gulp.task('sass-build', ['sass-clean'], sass.build);

gulp.task('server', server.start);
gulp.task('server-build', server['server-build']);

gulp.task('inject', html.inject);
gulp.task('inject-reload', ['inject'], function() {
  server.reload();
});

gulp.task('image-del', image.del);
gulp.task('image-dev', ['image-del'], image.dev);
gulp.task('image-del-build', image['del-build']);
gulp.task('image-build', ['image-del-build'], image.build);

gulp.task('eslint', require('./gulpfiles/lint.js'));

gulp.task('script-clean', script.clean);
gulp.task('script', ['script-clean'], script);
gulp.task('script-build', ['script-clean'], script.build);

gulp.task('del-public', build['del-public']);
gulp.task('del-dist-js-css-html', build['del-dist-js-css-html']);
gulp.task('del-temp', build['del-temp']);

gulp.task('combine-into-temp', build['combine-into-temp']);
gulp.task('move-to-public', ['combine-into-temp'], build['move-to-public']);

gulp.task('watch', function() {
  if (process.argv.indexOf(ARGS.LINT) !== -1) {
    gulp.watch(dir.src.js + '**/*.js', ['eslint']);
  }

  if (process.argv.indexOf(ARGS.LIVE_RELOAD) === -1) {
    gulp.watch(dir.dist.root  + '**/*', ['inject']);
  } else {
    gulp.watch(dir.dist.root  + '**/*', ['inject-reload']);
  }

  gulp.watch(dir.src.sass   + '**/*.scss', ['sass']);
  gulp.watch(dir.src.images + '**/*', ['image-dev']);
});

gulp.task('default', ['watch', 'script', 'sass', 'image-dev'], function() {
  gulp.start('inject');
  gulp.start('server');
});

gulp.task('build', gulpSync.sync([
    ['del-public', 'script-build', 'sass-build'],
    'inject',
    ['image-build', 'move-to-public'],
    ['del-temp', 'del-dist-js-css-html']
  ])
);
