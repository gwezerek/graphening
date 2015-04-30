/**
*
* Init
*
**/

'use strict';

var d3 = require( 'd3' );
var utils = require( './utils' );

var colors = require( './components/colors' );
// var timeline = require( './components/colors' );
var cards = require( './components/cards' );
var filter = require( './components/filter' );
var selectized = require( './components/selectized' );
var compileFilters = require( './components/compile-filter' );
var eventsDispatch = require( './components/events-dispatch' );

// Upgrade form elements with Selectize
// selectized();

d3.json( '../data/AllSets.json', function( error, data ) {

	// Save this?
	var baseData = data;

	// Populate filters with full range of values, returns flattened array
	var allCards = compileFilters( data );

	// Populate form elements with dimension ranges
	var selectizedEls = selectized.init( allCards );

	// Populate color graph table
	colors( allCards );

	eventsDispatch( selectizedEls );

	// timeline( data );
	cards( data );
	filter( data );
});
