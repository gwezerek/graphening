/**
*
* Filter Cards
*
**/

'use strict';

var appState = require( '../app-state' );
var _ = require( 'underscore' );

function init( firstLoad ) {
	var filterProperties = getFilterProperties();
	appState.currentCards = filterCards( filterProperties );
}

function getFilterProperties() {
	// Take appState.filters and break it into properties
	debugger;
}

function filterCards( filterProperties ) {
	var filteredCards = {};

	// TK code here

	return filteredCards;
}

module.exports = init;
