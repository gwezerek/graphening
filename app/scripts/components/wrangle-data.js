/**
*
* Filter
*
**/

'use strict';

var _ = require( 'underscore' );
var d3 = require( 'd3' );

var appState = require( '../app-state' );


// Flatten array of cards
exports.getAllCards = function( data ) {

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

	appState.allCards = allCards;
}

exports.getAllSets = function( data ) {

	var atTheTop = [ 'expansion', 'core', 'reprint', 'un' ];

	// Delete the cards so we're not holding a huge object in memory
	_.map( data, function( set ) {
		delete set.booster;
		delete set.cards;
	});


	data = _.toArray( data );

	var allSets = d3.nest()
			.key( function( set ) { return set.type; } ).sortKeys( function( a, b ) {
				var compA = _.contains( atTheTop, a ) ? atTheTop.indexOf( a ) : 100;
				var compB = _.contains( atTheTop, b ) ? atTheTop.indexOf( b ) : 100;
				return compA - compB;
			})
			.sortValues( function( a, b ) { return new Date( b.releaseDate ).getTime() - new Date( a.releaseDate ).getTime(); } )
			.entries( data );

	appState.allSets = allSets;
}
