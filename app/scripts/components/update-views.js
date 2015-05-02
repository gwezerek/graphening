/**
*
* Update views
*
**/

'use strict';

var colors = require( './colors' );

var updateViews = function( init ) {
	colors.prepData();
	colors.updateViews( init );
};

module.exports = updateViews;
