var gulp = require( 'gulp' );
var browserify = require( 'browserify' );
var source = require( 'vinyl-source-stream' );
var watchify = require( 'watchify' );
var buffer = require( 'vinyl-buffer' );
var sourcemaps = require( 'gulp-sourcemaps' );
var browserSync = require( 'browser-sync' );
var hbsfy = require( 'hbsfy' );
var reload = browserSync.reload;


gulp.task( 'browserify', function() {
  browserifyShare();
});

function browserifyShare() {
  var b = watchify( browserify( {
    entries: [ './app/scripts/init.js' ],
    cache: {},
    debug: true,
    packageCache: {},
    noparse: [ 'd3' ]
  }));

  b.transform( hbsfy );

  b.on( 'update', function(){
    bundleShare( b );
    reload;
  });

  bundleShare( b );
}

function bundleShare( b ) {
  b.bundle()
    .pipe( source( 'app.js' ) )
    .pipe( buffer() )
    .pipe( sourcemaps.init( { loadMaps: true } ) ) // loads map from browserify file
    .pipe( sourcemaps.write( './' ) ) // writes .map file
    .pipe( gulp.dest( './app/scripts' ) )
    .pipe( reload( { stream: true, once: true } ) );
}
