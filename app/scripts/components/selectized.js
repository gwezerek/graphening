/**
*
* Selectized
*
**/

'use strict';

var $ = require( 'jquery' );
var selectize = require( 'selectize' );
var appState = require( '../app-state' );

var init = function() {
	appState.filterEls =  $( '.filter__select--multi' ).selectize();
};

module.exports = init;
