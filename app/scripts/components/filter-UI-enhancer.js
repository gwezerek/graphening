/**
*
* Filter
*
**/

'use strict';

var $ = require( 'jquery' );
var selectize = require( 'selectize' );

function init() {
	$( '.filter__select--multi' ).selectize();
}

module.exports = init;
