var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var watchify = require('watchify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


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
    bundleShare(b);
    reload;
  });

  bundleShare(b);
}

function bundleShare(b) {
  b.bundle()
    .pipe( source( 'app.js' ) )
    .pipe( gulp.dest('./app/scripts') )
    .pipe(reload({stream: true, once: true}));
}
