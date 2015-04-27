/**
*
* Init
*
**/

'use strict';

var d3 = require( 'd3' );
var utils = require( './utils' );
var initTemplates = require( './init-templates' );

// var colors = require( './components/colors' );
// var timeline = require( './components/colors' );
var cards = require( './components/cards' );
var filter = require( './components/filter' );
var filterUIEnhancer = require( './components/filter-UI-enhancer' );

// Build the html from templates
initTemplates();

// Upgrade form elements with Select2
filterUIEnhancer();

// Populate the charts
d3.json( '../data/AllSets.json', function( error, data ) {
  // colors( data );
	// timeline( data );
	cards( data );
	filter( data );
});
