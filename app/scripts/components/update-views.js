/**
*
* Update views
*
**/

'use strict';

var colors = require( './colors' );


var initViews = function() {
	colors.prepData();
	colors.initViews();
}

var updateViews = function() {
	colors.prepData();
	colors.updateViews();
}

exports.initViews = initViews;
exports.updateViews = updateViews;
