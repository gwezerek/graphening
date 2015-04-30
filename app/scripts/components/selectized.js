/**
*
* Selectized
*
**/

'use strict';

var $ = require( 'jquery' );
var selectize = require( 'selectize' );

var init = function( flatArr ) {
	return $( '.filter__select--multi' ).selectize();
};

exports.init = init;