/**
*
* Bars
*
**/

'use strict';

var d3 = require( 'd3' );
var appState = require( '../app-state' );

var margin = { top: 15, bottom: 15 };
var height = 100 - margin.top - margin.bottom;
var barDomain = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9+', '*' ];

var xScale = d3.scale.ordinal()
    .domain( barDomain );

var yScale = d3.scale.linear()
    .range( [ 0, height ] );

var xAxis = d3.svg.axis()
    .scale( xScale )
    .outerTickSize( 0 )
    .orient( 'bottom' );

var initViz = function( color, dimension ) {

  // debugger;

  // Set domains now that template is populated and we have data
  yScale.domain( [ 0, appState.dimensionMaxima[ dimension ] ] );
  xScale.rangeRoundBands( [ 0, appState.vizWidth ], 0.33, 0 );

  var svg = d3.select( '#color__graph--' + dimension + '--' + color ).append( 'svg' )
      .attr( 'width', appState.vizWidth )
      .attr( 'height', height + margin.top + margin.bottom );

  var chart = svg.append( 'g' )
      .attr( 'width', appState.vizWidth )
      .attr( 'height', height )
      .attr( 'class', 'chart' )
      .attr( 'transform', 'translate( 0,' + margin.top +' )' );

  var xAxisEl = svg.append( 'g' )
      .attr( 'class', 'axis axis__x' )
      .attr( 'transform', 'translate( 0,' + ( height + margin.top ) +' )' )
      .call( xAxis );

  xAxisEl.selectAll( 'text' )
      .attr( 'y', 5 )
      .attr( 'class', 'axis__x__label');

  xAxisEl.selectAll( 'path' )
      .attr('class', 'axis__x__path');


  // Update bar groups
  var barWrap = chart.selectAll( 'g' )
      .data( appState.currentRollups[ color ][ dimension ].rollup );

  var barEnter = barWrap.enter().append( 'g' );

  barWrap.transition()
      .attr({
        class: 'bar__wrap',
        transform: function( d ) { return 'translate(' + xScale( d.key ) + ', 0)'; }
      });

  barWrap.exit()
      .remove();

  // Update bars
  barEnter.append( 'rect' );

  var bars = barWrap.selectAll( 'rect' )
      .data( function( d ) { return [ d ]; } );

  bars.attr({
        y: function ( d ) { return height - yScale( d.values ); },
        height: function( d ) { return yScale( d.values ); },
        width: xScale.rangeBand(),
        class: 'bar__rect'
      });

  // Update labels
  barEnter.append( 'text' );

  barWrap.selectAll( 'text' )
      .text( function( d ) { return d.values; } )
      .attr({
        x: xScale.rangeBand() / 2,
        y: function ( d ) { return height - yScale( d.values ) - 4; },
        class: 'bar__label'
      });
};

var updateViz = function( color, dimension ) {

  // Set domains now that template is populated and we have data
  yScale.domain( [ 0, appState.dimensionMaxima[ dimension ] ] );
  xScale.rangeRoundBands( [ 0, appState.vizWidth ], 0.33, 0 );

  // Need to update axis, axis labels, bars and bar labels
  // TK AXIS, AXIS LABELS

  // Update bar groups
  var barWrap = d3.selectAll( '#color__graph--' + dimension + '--' + color + ' .chart'  ).selectAll( 'g' )
      .data( appState.currentRollups[ color ][ dimension ].rollup );

  var barEnter = barWrap.enter().append( 'g' );

  barWrap.transition()
      .attr({
        class: 'bar__wrap',
        transform: function( d ) { return 'translate(' + xScale( d.key ) + ', 0 )'; }
      });

  barWrap.exit()
      .remove();

  // Update bars
  barEnter.append( 'rect' );

  var bars = barWrap.selectAll( 'rect' )
      .data( function( d ) { return [ d ]; } );

  bars.transition()
      .attr({
        y: function ( d ) { return height - yScale( d.values ); },
        height: function( d ) { return yScale( d.values ); },
        width: xScale.rangeBand(),
        class: 'bar__rect'
      });

  // Update labels
  barEnter.append( 'text' );

  barWrap.selectAll( 'text' )
      .data( function( d ) { return [ d ]; } )
      .text( function( d ) { return d.values; } )
      .transition()
      .attr({
        x: xScale.rangeBand() / 2,
        y: function ( d ) { return ( height - yScale( d.values ) - 4 ); },
        class: 'bar__label'
      });
};

exports.initViz = initViz;
exports.updateViz = updateViz;
