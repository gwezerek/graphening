var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var watchify = require('watchify');

gulp.task('browserify', function(){
  browserifyShare();
});

function browserifyShare(){
  var b = watchify( browserify( {
    entries: ['./app/scripts/init.js'],
    cache: {},
    packageCache: {},
    noparse: [ 'd3' ]
  }));

  b.on('update', function(){
    console.log('update event');
    bundleShare(b);
  });

  bundleShare(b);
}

function bundleShare(b) {
  b.bundle()
    .pipe( source( 'meow.js' ) )
    .pipe( gulp.dest('./app/scripts') );
}
