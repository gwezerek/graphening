/**
*
* Bind Listeners
*
**/

'use strict';

var $ = require( 'jquery' );
var _ = require( 'underscore' );
var selectized = require( './selectized' );
var appState = require( '../app-state' );
var filterCards = require( './filter-cards' );
var updateViews = require( './update-views' );

function init() {
	bindFilterListeners();
}

function bindFilterListeners( selectizedEls ) {
	appState.filterEls.on( 'change', function() {
		_.each( appState.filterEls, function( el, i ) {
			appState.filters[ i ].values = el.selectize.getValue();
		});

		filterCards();
		updateViews.updateViews();
	});
}

module.exports = init;
