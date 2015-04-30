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


d3.json( '../data/AllSets.json', function( error, data ) {
	// Populate filters with full range of values
	compileFilters( data );

	// Upgrade form elements with Selectize
	filterUIEnhancer();

	// Populate color graph table
  colors( data );

	// timeline( data );
	cards( data );
	filter( data );
});
