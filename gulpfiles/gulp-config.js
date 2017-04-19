module.exports.ARGS = {
  'LIVE_RELOAD': '-r',
  'LINT'       : '-l',
};

module.exports.ENV = {
  'DEVELOPMENT'     : 'development',
  'PRODUCTION'      : 'production',
  'DEVELOPMENT_PATH': './.env.development',
  'PRODUCTION_PATH' : './.env',
};

module.exports.file = {
  'src': {
    'js': 'index.js',
    'sass': 'style.scss',
    'html': 'index.html',
    'images': '**/*'
  },
  'dist': {
    'js': 'bundle.js',
    'sass': 'bundle.css',
    'html': 'index.html',
    'images': '**/*'
  }
};

module.exports.dir = {
  'src': {
    'js': 'src/js/',
    'sass': 'src/sass/',
    'html': 'src/',
    'images': 'src/images/',
  },
  'dist': {
    'root': 'dist/',
    'js': 'dist/js/',
    'css': 'dist/css/',
    'images': 'dist/images/'
  },
  'ignorePath': 'dist',
};

module.exports.handleError = function(err) { 
  console.error(err); this.emit('end'); 
};