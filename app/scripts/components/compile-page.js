/**
*
* Filter
*
**/

'use strict';

var _ = require( 'underscore' );
var Handlebars = require( 'hbsfy/runtime' );

var appState = require( '../app-state' );
var selectized = require( './selectized' );

var index = require( '../templates/index.hbs' );
var templateColors = require( '../templates/components/colors.hbs' );

// Partials
Handlebars.registerPartial( 'filter', require( '../templates/components/filters.hbs' ) );
Handlebars.registerPartial( 'cards', require( '../templates/components/cards.hbs' ) );
Handlebars.registerPartial( 'footer', require( '../templates/components/footer.hbs' ) );

function init( data, init ) {
	if ( init ) {
		// Add the filter chrome
		compilePage();
		selectized.init();
		compileColumns();
		setVizWidth();
	}

	appState.allCards = flattenCards( data );
}

function compilePage() {
	document.body.innerHTML = index();
}

// flatten array of cards
function flattenCards( data ) {

	var allCards = _.each( data, function( set ) {
		_.each( set.cards, function( card ) {
			card.set = set.name;
			card.magicCardsInfoCode = set.magicCardsInfoCode;
			
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
