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

	debugger;

	resetGrid();
}

function updateText() {
	document.querySelector( '.cards__selected' ).innerHTML = utils.formatCommas( appState.currentCards.length );
}

function addImages() {
	var newCards = appState.currentCards.slice( appState.currentSlice, appState.currentSlice + 7 );
	$( '.cards__grid' ).append( cards( { cards: newCards, init: false } ) );
	appState.currentSlice += newCards.length;
}

function resetGrid() {
	var newCards = appState.currentCards.slice( 0, 6 );
	$( '.cards__grid' ).append( cards( { cards: newCards, init: true } ) );
	appState.currentSlice = 6;
}


exports.update = update;
exports.addImages = addImages;
exports.resetGrid = resetGrid;
