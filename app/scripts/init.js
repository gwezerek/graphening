/**
*
* App Init
*
**/

'use strict';

var d3 = require( 'd3' );

var compilePage = require( './components/compile-page' );
var filterCards = require( './components/filter-cards' );
var updateViews = require( './components/update-views' );
var selectized = require( './components/selectized' );
var bindListeners = require( './components/bind-listeners' );

d3.json( './data/AllSets.json', function( error, data ) {

	// Populate filters
	compilePage( data );

	// Filter cards with default options
	filterCards.filterCards();

	// Init views
	updateViews.updateViews( true );

	// Add filter chrome
	selectized.populate();

	// Bind handlers
	bindListeners.init();

});
