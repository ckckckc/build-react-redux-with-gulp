var gulp       = require('gulp');
var browserify = require('browserify');
var babelify   = require('babelify');
var buffer     = require('vinyl-buffer');
var source     = require('vinyl-source-stream');
var watchify   = require('watchify');

// 印出錯誤，並發出事件完成，避免編譯過程因部分錯誤而讓 task 的進程停止。
var handleError = function(err) {
  console.error(err); this.emit('end'); 
};

//  開始設定 browserify 編譯規則
var bundler = browserify({
  // react 進入點
  'entries': 'src/js/index.js', 
  // true 可以讓瀏覽器的 console 印出出現 bug 的行數是來自在哪一個檔案的哪一行，而不是最後編譯後的檔案的哪一行
  'debug': true,
  // watchify 必須設定以下兩個屬性
  'cache': {},
  'packageCache': {},
  // 使用 babelify 轉換：會讀取根目錄 .babelrc 檔案的 babel 轉換規則
  // 使用 envify 轉換：可以將 NodeJs 中的 process.env，帶到轉換後的環境中使用
  //                 例如以 process.env.NODE_ENV 來區分開發或是產品等環境
  'transform': [babelify]
});

// 若是開發環境，我們在撰寫 .js 檔案的時候，將整個 React 專案重新編譯會太慢，watchify 提供 update 事件，讓重新編譯的速度更快。
var watcher = watchify(bundler);

watcher.on('update', function(e) {
  var start = Date.now();
  console.log('browserify update start... ', e);
  gulp.start('script');
  console.log('browserify update end after ', Date.now() - start + ' milliseconds');
});

// browserify 依據設定進行編譯，並將檔案匯出至指定資料夾。
gulp.task('script', function() {
  return watcher
          .bundle()
          .on('error', handleError)
          .pipe(source('bundle.js'))
          .pipe(buffer())
          .pipe(gulp.dest('dist/js/'));
});