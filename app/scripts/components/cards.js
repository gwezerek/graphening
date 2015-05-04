/**
*
* Cards
*
**/

'use strict';

var $ = require( 'jquery' );
var _ = require( 'underscore' );
var utils = require( '../utils' );
var appState = require( '../app-state' );

var cards = require( '../templates/components/cards.hbs' );

function update() {
	updateImages();
	updateText();
}

function updateImages() {
	appState.currentSlice = 0;
	$( '.cards__grid' ).empty();

	addImages();
}

function updateText() {
	document.querySelector( '.cards__selected' ).innerHTML = utils.formatCommas( appState.currentCards.length );
}

function checkAddBtnVisibility() {
	if ( appState.currentCards.length <= appState.currentSlice ) {
		$( '.cards__btn--add' ).addClass( 'cards__btn--add--finished' );
	} else {
		$( '.cards__btn--add' ).removeClass( 'cards__btn--add--finished' )
	}
}

function addImages( brushed ) {
	var cardSet = appState.currentCards;
	var newCards = cardSet.slice( appState.currentSlice, appState.currentSlice + 7 );
	$( '.cards__grid' ).append( cards( { cards: newCards } ) );
	appState.currentSlice += newCards.length;
	checkAddBtnVisibility();
}


exports.update = update;
exports.updateText = updateText;
exports.addImages = addImages;
