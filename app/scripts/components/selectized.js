/**
*
* Selectized
*
**/

'use strict';

var $ = require( 'jquery' );
var _ = require( 'underscore' );
var titleCase = require( 'titleCase' );
var selectize = require( 'selectize' );
var appState = require( '../app-state' );


var ranges = {
	'types': [],
	'subtypes': [],
	'artist': []
};

exports.init = function() {
	appState.filterEls =  $( '.filter__select--multi' ).selectize({
		render: {
			option: function( data, escape ) {
				return '<div class="option">' +
									'<span class="title">' + escape( data.text ) + '</span>' +
									'<span class="url">' + escape( data.block ) + '</span>' +
						'</div>';
			}
		},
		create: function( input ) {
			return {
				id: 0,
				text: '',
				block: '',
				release_date: ''
			};
		}
	});
};

exports.populate = function() {
	getRanges();
	populateSets();
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

function populateSets() {

	var selectizeEl = appState.filterEls.filter( '#filter__select--multi--set' )[0];

	_.each( appState.allSets, function( type, key ) {
			selectizeEl.selectize.addOptionGroup( key, {
			    label: titleCase( key )
			});

			_.each( type, function( set ) {
					debugger;
					selectizeEl.selectize.addOption({
				    	text: set.name,
				    	value: set.name,
				    	block: set.block,
				    	release_date: set.releaseDate,
				    	optgroup: key
			    });
			});

			// debugger;

	});

	// selectizeEl.selectize({
	// 	render: {
	// 		option: function( data, escape ) {
	// 			return '<div class="option">' +
	// 								'<span class="title">' + escape( data.text ) + '</span>' +
	// 								'<span class="url">' + escape( data.block ) + '</span>' +
	// 					'</div>';
	// 		}
	// 	},
	// 	create: function( input ) {
	// 		return {
	// 			id: 0,
	// 			text: '',
	// 			block: '',
	// 			release_date: ''
	// 		};
	// 	}
	// });

	selectizeEl.selectize.refreshOptions( false );
}


// get keys for each of the three dynamically populated filters
function getRanges() {
	_.each( _.keys( ranges ), function( dimension ) {
		ranges[ dimension ] = _.chain( appState.allCards )
			.pluck( dimension )
			.uniq()
			.value();

		if ( dimension === 'set' ) {

			// ranges[ dimension ].reverse();
		} else {
			ranges[ dimension ].sort();
		}
	});

}
