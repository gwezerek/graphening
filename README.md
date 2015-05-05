## Magic: The Graphening

* [Project website](http://gwezerek.github.io/cs171-pr-videogame-sales/)
* [Screencast](TKTK)

## Global dependencies

* [NPM](https://nodejs.org/)
* [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

## Development

1. Run `npm install --global gulp && npm install` from the project directory
1. Run `gulp serve` to open and view the project at localhost:3000

## Attribution

All libraries used in development of this site can be found in the package.json file at the root level. For convenience, here is a list.

* "apache-server-configs": "^2.7.1",
* "browser-sync": "^1.3.0",
* "browserify": "^9.0.8",
* "d3": "^3.5.5",
* "del": "^1.1.0",
* "gulp": "^3.8.5",
* "gulp-autoprefixer": "^2.0.0",
* "gulp-cache": "0.2.2",
* "gulp-changed": "^1.0.0",
* "gulp-csso": "^1.0.0",
* "gulp-flatten": "0.0.4",
* "gulp-if": "^1.2.1",
* "gulp-imagemin": "^2.0.0",
* "gulp-jshint": "^1.6.3",
* "gulp-load-plugins": "^0.8.0",
* "gulp-minify-html": "0.1.5",
* "gulp-replace": "^0.5.0",
* "gulp-sass": "^1.2.0",
* "gulp-size": "^1.0.0",
* "gulp-sourcemaps": "^1.3.0",
* "gulp-uglify": "^1.0.1",
* "gulp-uncss": "^1.0.0",
* "gulp-useref": "^1.0.1",
* "handlebars": "^3.0.2",
* "hbsfy": "^2.2.1",
* "jquery": "^2.1.3",
* "jshint-stylish": "^1.0.0",
* "opn": "^1.0.0",
* "psi": "^1.0.4",
* "require-dir": "^0.1.0",
* "run-sequence": "^1.0.1",
* "select2": "^3.5.2-browserify",
* "selectize": "^0.12.1",
* "underscore": "^1.8.3",
* "vinyl-buffer": "^1.0.0",
* "vinyl-source-stream": "^1.1.0",
* "vinyl-transform": "^1.0.0",
* "watchify": "^3.1.1"

All code within app/scripts is my own, aside from one or two helper functions from stackoverflow (attributed inline with comments).

Hopefully all features of my app are obvious, but just in case: You can filter cards using the multiselect boxes, brush any of the bar graphs to further filter the selected cards and see those cards by clicking "Show selected cards."