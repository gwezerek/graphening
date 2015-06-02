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
