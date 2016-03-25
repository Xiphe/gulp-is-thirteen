gulp-is-thirteen
----------------

[![Love and Peace](http://love-and-peace.github.io/love-and-peace/badges/base/v1.0-small.svg)](https://github.com/love-and-peace/love-and-peace/blob/master/versions/base/v1.0/en.md)


streaming support for [is-thirteen](https://github.com/jezen/is-thirteen)


Usage
-----

```js
var gulp = require('gulp');
var is = require('gulp-is-thirteen');

gulp.task('13', function() {
  return gulp.src('**/13')
    .pipe(is.thirteen)
    .pipe(gulp.dest('filesThatAreThirteen/'));
});
```

### roughly

```js
gulp.src('**/13.2')
  .pipe(is.roughly.thirteen)
  .pipe(gulp.dest('filesThatAreRoughlyThirteen/'));
```

### within

```js
gulp.src('**/7')
  .pipe(is.within(10).of.thirteen)
  .pipe(gulp.dest('filesThatAreWithinTenOfThirteen/'));
```

### by

```js
var attribute = 'name';
gulp.src('**/13')
  .pipe(is.thirteen.by(attribute))
  .pipe(gulp.dest('filesThatAreThirteenByName/'));
```

Supported attributes:

 - `content` (default)  
   check if the files content is thirteen

 - `name`  
   check if the files name is thirteen


License
-------

[WTFPL](http://www.wtfpl.net/txt/copying/)

