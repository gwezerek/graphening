/**
*
* Colors
*
**/

'use strict';

var d3 = require( 'd3' );
var _ = require( 'underscore' );
var appState = require( '../app-state' );

var margin = { top: 15, right: 0, bottom: 15, left: 0 };
var graphEl = document.querySelector( '.color__graph__wrap' );
var width = graphEl.clientWidth - margin.left - margin.right;
var height = 100 - margin.top - margin.bottom;
var barDomain = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9+', '*' ];

var xScale = d3.scale.ordinal()
    .domain( barDomain )
    .rangeRoundBands( [ 0, width ], 0.33, 0 );

var yScale = d3.scale.linear()
    .range( [ height, 0 ] );

var xAxis = d3.svg.axis()
    .scale( xScale )
    .outerTickSize( 0 )
    .orient( 'bottom' );

var initViz = function( color, dimension ) {

  // Set current yScale domain
  yScale.domain( [ 0, appState.valueMaxima[ dimension ] ] );

  var svg = d3.select( '#color__graph--' + dimension + '--' + color ).append( 'svg' )
      .attr( 'width', width + margin.left + margin.right )
      .attr( 'height', height + margin.top + margin.bottom );

  var chart = svg.append( 'g' )
      .attr( 'width', width )
      .attr( 'height', height )
      .attr( 'transform', 'translate( ' + margin.left + ',' + margin.top +' )' );

  var xAxisEl = svg.append( 'g' )
      .attr( 'class', 'axis axis__x' )
      .attr( 'transform', 'translate( 0,' + ( height + margin.top ) +' )' )
      .call( xAxis );

  var xAxisLabels = xAxisEl.selectAll( 'text' )
      .attr( 'y', 5 )
      .attr( 'class', 'axis__x__label');

  var xAxisPath = xAxisEl.selectAll( 'path' )
      .attr('class', 'axis__x__path');


  // Update bar groups
  var barWrap = chart.selectAll( 'g' )
      .data( rollups[ color ][ dimension ].rollup );

  var barEnter = barWrap.enter().append( 'g' );

  barWrap.transition()
      .attr({
        class: 'bar__wrap',
        transform: function( d ) { return 'translate(' + xScale( d.key ) + ', ' + yScale( d.values ) + ')'; }
      });

  barWrap.exit()
      .remove();

  // Update bars
  barEnter.append( 'rect' );

  var bars = barWrap.selectAll( 'rect' )
      .data( function( d ) { return [ d ]; } );

  bars.attr({
        height: function( d ) { return height - yScale( d.values ); },
        width: xScale.rangeBand(),
        class: 'bar__rect'
      });

  // Update labels
  barEnter.append( 'text' );

  var labels = barWrap.selectAll( 'text' )
      .text( function( d ) { return d.values; })
      .attr({
        x: xScale.rangeBand() / 2,
        y: -4,
        class: 'bar__label'
      });
}

var updateViz = function( color, dimension ) {

}

exports.initViz = initViz;
exports.updateViz = updateViz;
