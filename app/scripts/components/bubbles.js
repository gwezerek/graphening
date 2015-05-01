/**
*
* Colors
*
**/

'use strict';

var d3 = require( 'd3' );
var _ = require( 'underscore' );
var appState = require( '../app-state' );

var bubbleDomain = [ 'Common', 'Uncommon', 'Rare', 'Mythic Rare', 'Basic Land'  ]

var bubbleScale = d3.scale.ordinal()
    .domain( bubbleDomain );

var rScale = d3.scale.sqrt();

var initViz = function( color, dimension ) {

  // Set domains now that template is populated and we have data
  bubbleScale.rangeRoundBands( [ 0, ( appState.vizWidth / 2 + 35 ) * bubbleDomain.length ], .5, 0 );
  rScale.range( [ 0, appState.vizWidth / 4 ] )
      .domain( [ 0, appState.dimensionMaxima[ dimension ] ] );

  var width = appState.vizWidth;
  var height = ( width / 2 + 24 ) * bubbleDomain.length;
  var margin = { top: width / 4 + 20, bottom: width / 4 };


  var svg = d3.select( '#color__graph--' + dimension + '--' + color ).append( 'svg' )
      .attr( 'width', width )
      .attr( 'height', height + margin.top + margin.bottom );

  var chart = svg.append( 'g' )
      .attr( 'width', width )
      .attr( 'height', height )
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

  var valueLabels = bubbleWrap.selectAll( '.bubble__label--value' )
      .text( function( d ) { return d.values; } )
      .attr( 'y', 3 );

  // Update key labels
  bubbleEnter.append( 'text' )
      .attr( 'class', 'bubble__label bubble__label--key' );

  var keyLabels = bubbleWrap.selectAll( '.bubble__label--key' )
      .text( function( d ) { return d.key; } )
      .attr( 'y', -width / 4 - 10 );
}

var updateViz = function( color, dimension ) {

  // Set domains now that template is populated and we have data
  rScale.domain( [ 0, appState.dimensionMaxima[ dimension ] ] );
}

exports.initViz = initViz;
exports.updateViz = updateViz;
