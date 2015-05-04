/**
*
* Update views
*
**/

'use strict';

var colors = require( './colors' );
var cards = require( './cards' );

exports.updateViews = function( init ) {
	colors.prepData();
	colors.updateViews( init );
	cards.update();
};

// Unsure why the below doesn't work, using exports instead...
// module.exports = updateViews;
