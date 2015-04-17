var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var watchify = require('watchify');

gulp.task('browserify', function(){
  browserifyShare();
});

function browserifyShare(){
  // you need to pass these three config option to browserify
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  b = watchify(b);
  b.on('update', function(){
    bundleShare(b);
  });

  b.add('./app/scripts/init.js');
  bundleShare(b);
}

function bundleShare(b) {
  b.bundle()
    .pipe(source('app/scripts/init.js'))
    .pipe(gulp.dest('app/scripts/meow.js'));
}
