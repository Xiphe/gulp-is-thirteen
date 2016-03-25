'use strict';

var is = require('is-thirteen');
var through2 = require('through2');
var path = require('path');
var gutil = require('gulp-util');

var fakeX = {};
var x;

fakeX.toString = function() {
  return x;
}

function toStream(fn) {
  var checkBy = 'content';

  var strm = through2.obj(function(file, enc, next) {
    switch (checkBy) {
      case 'content':
        x = file.contents.toString();
        break;
      case 'name':
        x = path.basename(file.path, path.extname(file.path));
        break;
      default:
        this.emit('error', new gutil.PluginError(
          'gulp-is-thirteen',
          'unsupported "by" attribute "' + checkBy + '"'
        ));
        next();
        return;
    }

    if (fn()) {
      this.push(file);
    }
  });

  strm.by = function by(attr) {
    checkBy = attr;

    return strm;
  }

  return strm;
}

function wrap(fn) {
  Object.keys(fn).forEach(function(key) {
    if (key === 'thirteen') {
      fn[key] = toStream(fn[key]);
    } else if (typeof fn[key] === 'object') {
      fn[key] = wrap(fn[key]);
    } else if (typeof fn[key] === 'function') {
      var orig = fn[key];
      fn[key] = function() {
        return wrap(orig.apply(null, arguments));
      }
    }
  });

  return fn;
}

module.exports = wrap(is(fakeX));
