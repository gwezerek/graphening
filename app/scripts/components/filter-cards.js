/**
*
* Filter Cards
*
**/

'use strict';

var appState = require( '../app-state' );
var _ = require( 'underscore' );

function init( firstLoad ) {
	appState.currentCards = filterCards();
}

function filterCards() {
	var filteredCards = appState.allCards;

	// Progressively filter all cards
	_.each( appState.filters, function( filter ) {
		var dimensionUnion = [];
		if ( filter.values.length ) {
			_.each( filter.values, function( value ) {
				var propertyPair = {};
				propertyPair[ filter.dimension ] = value;

				dimensionUnion.push.apply( dimensionUnion, _.where( filteredCards, propertyPair ) );
			});

			filteredCards = dimensionUnion;
		}
	});

	debugger;

	return filteredCards;
}

module.exports = init;
