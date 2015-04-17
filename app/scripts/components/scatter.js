/**
*
* Scatter
*
**/

(function () {

	'use strict';

	var d3 = require( 'd3' );

	var querySelector = document.querySelector.bind(document);
	var margin = { top: 20, right: 20, bottom: 30, left: 50 };
	var parentWidth = querySelector( '#scatter__wrap' ).offsetWidth;
  var width = parentWidth - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  // Create graph
  var svg = d3.select( '#scatter__wrap' ).append( 'svg' )
      .attr( 'width', width + margin.left + margin.right )
      .attr( 'height', height + margin.top + margin.bottom );

	function init( loadedJSON ) {
		var data = loadedJSON;
		console.log( parentWidth );
	}

	module.exports = init;

})();
