/**
*
* Filter Cards
*
**/

'use strict';

var appState = require( '../app-state' );
var _ = require( 'underscore' );

var rank = {
	'Mythic Rare' : 1,
	'Rare' :2,
	'Uncommon' :3,
	'Common' :4,
	'Special' : 5,
	'Basic Land' :6
};

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

	filteredCards = sortCardsByRarity( filteredCards );

	appState.isBrushed = false;
	appState.filteredCards = filteredCards;
	appState.currentCards = filteredCards;
}

function getCardsById( ids ) {
	var currentCards  = _.filter( appState.filteredCards, function( card ) {
		return ids.indexOf( card.multiverseid ) !== -1;
	});

	appState.isBrushed = true;
	appState.currentCards = sortCardsByRarity( currentCards );
}

function sortCardsByRarity( filteredCards ) {
	var sortedArr = _.sortBy( filteredCards, function( card ) {
		return rank[ card.rarity ];
	});

	return sortedArr;
}

exports.filterCards = filterCards;
exports.getCardsById = getCardsById;
