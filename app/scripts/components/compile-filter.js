/**
*
* Filter
*
**/

'use strict';

var _ = require( 'underscore' );
var templateFilterOptions = require( '../templates/partials/filter-options.hbs' );

var ranges = {
	'set': [],
	'types': [],
	'subtypes': []
}

// flatten array of cards
function flattenCards( data ) {

	var flatArr = _.each( data, function( set ) {
		_.each( set.cards, function( card ) {
			card.set = set.name;
		});
	});

	flatArr = _.chain( flatArr )
			.pluck( 'cards' )
			.flatten( true )
			.value();

	setRanges( flatArr );
}

// get keys for each of the four filters
function setRanges( flatArr ) {
	_.each( _.keys( ranges ), function( dimension ) {
		ranges[ dimension ] = _.chain( flatArr)
			.map( function( card ) {
				if ( _.isArray( card[ dimension ] ) ) {
				  return card[ dimension ].join('/');
				}
				return card[ dimension ];
			})
			.uniq()
			.value();
	});

	compileOptions();
}

// compile template for each and insert that html
function compileOptions() {
	_.each( _.keys( ranges ), function( dimension ) {
		document.querySelector( '#filter__select--multi--' + dimension ).innerHTML = templateFilterOptions( { 'dimension_value': ranges[ dimension ] } );
	});
}

function init( loadedJSON ) {
	var data = loadedJSON;
	flattenCards( data );
}

module.exports = init;
