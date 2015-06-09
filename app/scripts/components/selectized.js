/**
*
* Selectized
*
**/

'use strict';

var $ = require( 'jquery' );
var _ = require( 'underscore' );
var moment = require( 'moment' );
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
									'<img src="images/boosters/$_35.JPG" class="filter__opt__img">' +
									'<div class="filter__opt__textwrap">' +
										'<span class="filter__opt__name">' + escape( data.text ) + '</span>' +
										( data.block ? '<span class="filter__opt__metadata filter__opt__text--block">Block: ' + escape( data.block ) + '</span>' : '' ) +
										( data.release_date ? '<span class="filter__opt__metadata filter__opt__text--release">Released: ' + escape( data.release_date ) + '</span>' : '' ) +
									'</div>' +
						'</div>';
			}
		},
		searchField: [ 'text', 'block', 'release_date' ]
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

	_.each( appState.allSets, function( type ) {
			selectizeEl.selectize.addOptionGroup( type.key, {
			    label: titleCase( type.key )
			});

			_.each( type.values, function( set ) {
					selectizeEl.selectize.addOption({
				    	text: set.name,
				    	value: set.name,
				    	block: set.block,
				    	release_date: moment( set.releaseDate ).format( 'MMM. [’]YY' ),
				    	optgroup: type.key
			    });
			});
	});

	selectDefaultSet( selectizeEl );

}

function selectDefaultSet( setEl ) {
		setEl.selectize.setValue( appState.defaultSet );
}


// get keys for each of the three dynamically populated filters
function getRanges() {
	_.each( _.keys( ranges ), function( dimension ) {
		ranges[ dimension ] = _.chain( appState.allCards )
			.pluck( dimension )
			.uniq()
			.sort()
			.value();
	});
}
