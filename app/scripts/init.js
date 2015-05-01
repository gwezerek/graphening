/**
*
* App Init
*
**/

'use strict';

var d3 = require( 'd3' );

var compileFilters = require( './components/compile-filter' );
var filterCards = require( './components/filter-cards' );
var updateViews = require( './components/update-views' );
var selectized = require( './components/selectized' );
var bindListeners = require( './components/bind-listeners' );

d3.json( '../data/AllSets.json', function( error, data ) {

	// Populate filters
	compileFilters( data );

	// Filter cards with default options
	filterCards();

	// Update views
	updateViews();
	// colors( allCards );

	// Add filter chrome
	selectized();

	// Bind handlers
	bindListeners();

});
