/**
*
* Events Dispatch
*
**/

'use strict';

var $ = require( 'jquery' );
var _ = require( 'underscore' );
var selectized = require( './selectized' );

var filters = [
	{ 
		'dimension': 'set',
		'values': []
	}, { 
		'dimension': 'rarity',
		'values': []
	}, { 
		'dimension': 'types',
		'values': []
	}, { 
		'dimension': 'subtypes',
		'values': []
	}
]

function bindFilterListeners( selectizedEls ) {
	// set up event listeners
	selectizedEls.on( 'change', function() {
		_.each( selectizedEls, function( el, i ) {
			filters[ i ].values = el.selectize.getValue();
		});
		filterCards();
	});
}

function filterCards() {
	
}

function init( selectizedEls ) {
	bindFilterListeners( selectizedEls );
}

module.exports = init;
