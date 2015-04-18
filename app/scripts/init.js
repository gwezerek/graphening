/**
*
* Init
*
**/

'use strict';

var d3 = require( 'd3' );
var utils = require( './utils' );
var scatter = require( './components/scatter' );
var timeline = require( './components/scatter' );
var cards = require( './components/cards' );
var filter = require( './components/filter' );
var filterUIEnhancer = require( './components/filter-UI-enhancer' );

filterUIEnhancer();

d3.json( '../data/AllCards.json', function( error, data ) {
  scatter( data );
	timeline( data );
	cards( data );
	filter( data );
});
