/**
*
* Update views
*
**/

'use strict';

var colors = require( './colors' );
var cards = require( './cards' );
var bars = require( './bars' );

exports.updateViews = function( init ) {
	colors.prepData();
	colors.updateViews( init );
	cards.update();
	bars.clearBrushes();
};

// Unsure why the below doesn't work, using exports instead...
// module.exports = updateViews;
