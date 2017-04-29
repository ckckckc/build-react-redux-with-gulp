# build-react-redux-with-gulp

## How To Use It

```
$ git clone https://github.com/ckckckc/build-react-redux-with-gulp.git
```

```
$ cd build-react-redux-with-gulp
```

```
$ npm install
```

```
$ npm run bower-install
```

(development)
```
$ npm run dev
```

(production)
```
$ npm run build
```

(test)
```
$ npm test
```

## Folder Structure

* public: production root folder
* dist: development root folder
* src: html css js source code
* gulpfiles: gulp tasks
* temp: temporarily save files for building public folder

## Feature

* Compile JSX ES6 | Babel Browserify
* Compile SASS | Gulp Sass
* Uglify JavaScript SASS | Gulp Sass Uglify
* Auto inject JS CSS into HTML  | Gulp Inject
* Local server with livereload | Gulp Watch Connect
* Debug mode | Gulp Sourcemap
* JavaScript ESLint | ESLint
* Unit test | Jest
* Switch development/production enviroment variable | Browerify Dotenv Envify
* Manage front end package | Bower Wiredep
* Compress all the files by the same file type | Gulp Useref
* Output file name with hash | Gulp Rev 
* Minify PNG, JPEG, GIF and SVG images | Gulp Imagemin
* Sample code with Redux React-Router | React Redux Router
