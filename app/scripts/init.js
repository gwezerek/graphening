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
var filterUIEnhancer = require( './components/filter-UI-enhancer' );
var compileFilters = require( './components/compile-filter' );

// Upgrade form elements with Selectize
// filterUIEnhancer();

d3.json( '../data/AllSets.json', function( error, data ) {

	// Save this?
	var baseData = data;

	// Populate filters with full range of values, returns flattened array
	var allCards = compileFilters( data );

	// Populate form elements with dimension ranges
	filterUIEnhancer( allCards );

	// Populate color graph table
  colors( allCards );

	// timeline( data );
	cards( data );
	filter( data );
});
