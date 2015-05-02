/**
*
* Filter
*
**/

'use strict';

var _ = require( 'underscore' );
var appState = require( '../app-state' );

var templateColors = require( '../templates/components/colors.hbs' );

function init( data ) {
	appState.allCards = flattenCards( data );
	compileColumns();
	setVizWidth();
}

// flatten array of cards
function flattenCards( data ) {

	var allCards = _.each( data, function( set ) {
		_.each( set.cards, function( card ) {
			card.set = set.name;

			// while we're at it...
			if ( _.isArray( card.types ) ) {
				card.types = card.types.join(' ');
			}
			if ( _.isArray( card.subtypes ) ) {
				card.subtypes = card.subtypes.join(' ');
			}
		});
	});

	allCards = _.chain( allCards )
			.pluck( 'cards' )
			.flatten( true )
			.value();

	return allCards;
}

function compileColumns() {
	var colorObj = _.object( appState.colors, [ true, true , true, true, true, false, false ] );
	document.querySelector( '#colors' ).innerHTML += templateColors( { 'color': colorObj } );
}

function setVizWidth() {
	appState.vizWidth = document.querySelector( '.color__graph__wrap' ).clientWidth;
}

module.exports = init;
