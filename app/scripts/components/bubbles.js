/**
*
* Colors
*
**/

'use strict';

var d3 = require( 'd3' );
var utils = require( '../utils' );
var appState = require( '../app-state' );

// Scales
var bubbleScale = d3.scale.ordinal();
var rScale = d3.scale.sqrt();


var initViz = function( color, dimension ) {

  var domain = appState.domains[ dimension ];
  var width = appState.vizWidth;
  var height = ( width / 2 + 20 ) * domain.length;
  var margin = { top: width / 4 + 20, bottom: width / 4 };

  // Set domains now that template is populated and we have data
  bubbleScale.domain( appState.domains.rarity )
      .rangeRoundBands( [ 0, height ], 0.75, 0 );

  rScale.domain( [ 0, appState.dimensionMaxima[ dimension ] ] )
      .range( [ 0, width / 4 ] );

  var svg = d3.select( '#color__graph--' + dimension + '--' + color ).append( 'svg' )
      .attr( 'width', width )
      .attr( 'height', height + margin.top + margin.bottom )
      .attr( 'class', 'svg' );

  var chart = svg.append( 'g' )
      .attr( 'width', width )
      .attr( 'height', height )
      .attr( 'class', 'chart' )
      .attr( 'transform', 'translate( 0,' + margin.top + ')' );

  // Update bar groups
  var bubbleWrap = chart.selectAll( 'g' )
      .data( appState.currentRollups[ color ][ dimension ].rollup );

  var bubbleEnter = bubbleWrap.enter().append( 'g' );

  bubbleWrap.transition()
      .attr({
        class: 'bubble__wrap',
        transform: function( d ) { return 'translate(' + width / 2 + ', ' + bubbleScale( d.key ) + ')'; }
      });

  bubbleWrap.exit()
      .remove();

  // Update bubbles
  bubbleEnter.append( 'circle' );

  var bubbles = bubbleWrap.selectAll( 'circle' )
      .data( function( d ) { return [ d ]; } );

  bubbles.attr({
        r: function( d ) { return rScale( d.values ); },
        class: 'bubble__circle'
      });

  // Update value labels
  bubbleEnter.append( 'text' )
    .attr( 'class', 'bubble__label bubble__label--value' );

  bubbleWrap.selectAll( '.bubble__label--value' )
      .text( function( d ) { return d.values; } )
      .attr( 'y', 3 );

  // Update key labels
  bubbleEnter.append( 'text' )
      .attr( 'class', 'bubble__label bubble__label--key' );

  bubbleWrap.selectAll( '.bubble__label--key' )
      .text( function( d ) { return d.key; } )
      .attr( 'y', -width / 4 - 10 );
};

var updateViz = function( color, dimension ) {

  var domain = appState.domains[ dimension ];
  var width = appState.vizWidth;
  var height = ( width / 2 + 20 ) * domain.length;
  var margin = { top: width / 4 + 20, bottom: width / 4 };

  // Set domains now that template is populated and we have data
  bubbleScale.domain( appState.domains.rarity )
      .rangeRoundBands( [ 0, height ], 0.75, 0 );

  rScale.domain( [ 0, appState.dimensionMaxima[ dimension ] ] )
      .range( [ 0, width / 4 ] );

  // Update the viz height
  var svg = d3.select( '#color__graph--' + dimension + '--' + color + ' .svg')
      .transition()
      .attr( 'height', height + margin.top + margin.bottom );

  // Update the chart height
  svg.select( '.chart' )
      .transition()
      .attr( 'height', height );

  // Update bar groups
  var bubbleWrap = d3.selectAll( '#color__graph--' + dimension + '--' + color + ' .chart'  ).selectAll( 'g' )
      .data( appState.currentRollups[ color ][ dimension ].rollup );

  var bubbleEnter = bubbleWrap.enter().append( 'g' );

  bubbleWrap.transition()
      .attr({
        class: 'bubble__wrap',
        transform: function( d ) { return 'translate(' + width / 2 + ', ' + bubbleScale( d.key ) + ')'; }
      });

  bubbleWrap.exit()
      .remove();

  // Update bubbles
  bubbleEnter.append( 'circle' );

  var bubbles = bubbleWrap.selectAll( 'circle' )
      .data( function( d ) { return [ d ]; } );

  bubbles.transition()
      .attr({
        r: function( d ) { return rScale( d.values ); },
        class: 'bubble__circle'
      });

  // Update value labels
  bubbleEnter.append( 'text' )
    .attr( 'class', 'bubble__label bubble__label--value' );

  bubbleWrap.selectAll( '.bubble__label--value' )
      .data( function( d ) { return [ d ]; } )
      .text( function( d ) { return utils.formatCommas( d.values ); } )
      .attr( 'y', 3 );

  // Update key labels
  bubbleEnter.append( 'text' )
      .attr( 'class', 'bubble__label bubble__label--key' );

  bubbleWrap.selectAll( '.bubble__label--key' )
      .data( function( d ) { return [ d ]; } )
      .text( function( d ) { return d.key; } )
      .attr( 'y', -width / 4 - 10 );
};

exports.initViz = initViz;
exports.updateViz = updateViz;
