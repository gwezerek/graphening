/**
*
* Update views
*
**/

'use strict';

var colors = require( './colors' );
var cards = require( './cards' );

var updateViews = function( init ) {
	colors.prepData();
	colors.updateViews( init );
	cards.update();
};

module.exports = updateViews;
