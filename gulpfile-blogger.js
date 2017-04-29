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

var connect = require('gulp-connect');

// 建立伺服器: http://localhost:8080 (預設)
gulp.task('server', function(){
  connect.server({
    // 本地伺服器根目錄
    root: 'dist/',
    // 當 connect.reload() 時，瀏覽器是否要重新載入
    livereload: true,
    // 用於 react router，所有 root folder 以下的 request 都會轉導到指定檔案
    fallback: 'dist/index.html'
  });
});

// 觸發 livereload 的 task，若已經跑過 server task，觸發這個 task 就會 reload
// 搭配 gulp.watch 來執行
gulp.task('reload', function() {
  return gulp.src('dist/index.html')
          .pipe(connect.reload());
});





// gulpfile.js
var autoprefixer = require('gulp-autoprefixer');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');

// 可以根據不同的開發環境給不同的 option
var sassOptions = {
  'includePaths': ['src/sass/'], 
};
var prefixerOptions = {
  'browsers': ['Last 1 versions']
};

// 加入 sass task
gulp.task('sass', function() {
  return gulp.src('src/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(prefixerOptions))
    .pipe(gulp.dest('dist/css/'));
});