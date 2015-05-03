/**
*
* Cards
*
**/

'use strict';

var _ = require( 'underscore' );
var utils = require( '../utils' );
var appState = require( '../app-state' );

var cards = require( '../templates/components/cards.hbs' );

function update() {
	updateImages();
	updateText();
}

function updateText() {
	document.querySelector( '.cards__selected' ).innerHTML = utils.formatCommas( appState.currentCards.length );
}

function updateImages() {
	console.log( appState.currentCards.slice( 0, 6) );
	document.querySelector( '.cards' ).innerHTML = cards( { cards: appState.currentCards.slice( 0, 6) } );
}

exports.update = update;
