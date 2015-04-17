/**
*
* Init
*
**/


( function () {
  'use strict';

  var d3 = require( 'd3' );
  var scatter = require( './components/scatter' );
  var timeline = require( './components/scatter' );
  var cards = require( './components/cards' );
  var filter = require( './components/filter' );

  var querySelector = document.querySelector.bind( document );

  d3.json( '../data/AllCards.json', function( error, data ) {
  	scatter( data );
  	timeline( data );
  	cards( data );
		filter( data );
  });

})();
