/**
*
* Filter
*
**/

'use strict';

var _ = require( 'underscore' );
var appState = require( '../app-state' );
var templateFilterOptions = require( '../templates/partials/filter-options.hbs' );

var ranges = {
	'set': [],
	'types': [],
	'subtypes': []
}

function init( data ) {
	appState.allCards = flattenCards( data );
	getRanges();
	compileOptions();
}

// flatten array of cards
function flattenCards( data ) {

	var allCards = _.each( data, function( set ) {
		_.each( set.cards, function( card ) {
			card.set = set.name;

			// while we're at it...
			if ( _.isArray( card.types ) ) {
				card.types = card.types.join('/');
			}
			if ( _.isArray( card.subtypes ) ) {
				card.subtypes = card.subtypes.join('/');
			}
		});
	});

	allCards = _.chain( allCards )
			.pluck( 'cards' )
			.flatten( true )
			.value();

	return allCards;
}

// get keys for each of the four filters
function getRanges() {
	_.each( _.keys( ranges ), function( dimension ) {
		ranges[ dimension ] = _.chain( appState.allCards )
			.pluck( dimension )
			.uniq()
			.value();
	});
}

// compile template for each and insert that html
// refactor to use native selectize update
function compileOptions() {
	_.each( _.keys( ranges ), function( dimension ) {
		document.querySelector( '#filter__select--multi--' + dimension ).innerHTML = templateFilterOptions( { 'dimension_value': ranges[ dimension ] } );
	});
}

module.exports = init;
