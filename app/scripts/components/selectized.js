/**
*
* Selectized
*
**/

'use strict';

var $ = require( 'jquery' );
var _ = require( 'underscore' );
var selectize = require( 'selectize' );
var appState = require( '../app-state' );

var ranges = {
	'set': [],
	'types': [],
	'subtypes': [],
	'artist': []
};

var init = function() {
	appState.filterEls =  $( '.filter__select--multi' ).selectize();
};

var populate = function() {
	getRanges();
	compileOptions();
};

function compileOptions() {
	_.each( _.keys( ranges ), function( dimension ) {
		var optionsObj = [];

		_.each( ranges[ dimension ], function( dimensionValue ) {
			optionsObj.push({
				text: dimensionValue, 
				value: dimensionValue
			});
		});

		appState.filterEls.filter( '#filter__select--multi--' + dimension )[0].selectize.load( function( callback ) {
		    callback( optionsObj );
		});
	});
}

// get keys for each of the three dynamically populated filters
function getRanges() {
	_.each( _.keys( ranges ), function( dimension ) {
		ranges[ dimension ] = _.chain( appState.allCards )
			.pluck( dimension )
			.uniq()
			.value();

		if ( dimension === 'set' ) {
			ranges[ dimension ].reverse();
		} else {
			ranges[ dimension ].sort();
		}
	});
}

exports.init = init;
exports.populate = populate;
