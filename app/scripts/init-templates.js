/**
*
* Init tempaltes
*
**/

'use strict';

var utils = require( './utils' );
var templateColors = require( './templates/colors.hbs' );

function populateColors() {
	utils.querySelector( '#colors' ).innerHTML = templateColors();
}

function init() {
	populateColors();
}

module.exports = init;
