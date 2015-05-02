/**
*
* Cards
*
**/

'use strict';

var _ = require( 'underscore' );
var appState = require( '../app-state' );

function updateSelected() {
	document.querySelector( '.cards__selected' ).innerHTML = appState.currentCards.length;
}

exports.updateSelected = updateSelected;
