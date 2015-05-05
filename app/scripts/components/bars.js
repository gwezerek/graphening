/**
*
* Bars
*
**/

'use strict';

var $ = require( 'jquery' );
var d3 = require( 'd3' );
var utils = require( '../utils' );
var appState = require( '../app-state' );
var bindListeners = require( './bind-listeners' );

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
        y: function ( d ) { return height - yScale( d.values.count ); },
        height: function( d ) { return yScale( d.values.count ); },
        width: xScale.rangeBand(),
        class: 'bar__rect'
      });

  // Update labels
  barEnter.append( 'text' );

  barWrap.selectAll( 'text' )
      .text( function( d ) { return d.values.count; } )
      .attr({
        x: xScale.rangeBand() / 2,
        y: function ( d ) { return height - yScale( d.values.count ) - 4; },
        class: 'bar__label'
      });
      
  // Brush
  // var brush = d3.svg.brush()
  //     .x( xScale );

  // var brushGroup = svg.append( 'g' )
  //     .attr( 'class', 'brush' )
  //     .call( brush );
    
  // brushGroup.selectAll( 'rect' )
  //     .attr( 'height', height + margin.top );

  // brushGroup.datum( { brush: brush } );

  // bindListeners.bindBrushListeners( brush, xScale );

};

var updateViz = function( color, dimension ) {

  // Set domains now that template is populated and we have data
  yScale.domain( [ 0, appState.dimensionMaxima[ dimension ] ] );
  xScale.rangeRoundBands( [ 0, appState.vizWidth ], 0.33, 0 );

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
        y: function ( d ) { return height - yScale( d.values.count ); },
        height: function( d ) { return yScale( d.values.count ); },
        width: xScale.rangeBand(),
        class: 'bar__rect'
      });

  // Update labels
  barEnter.append( 'text' );

  barWrap.selectAll( 'text' )
      .data( function( d ) { return [ d ]; } )
      .text( function( d ) { return utils.formatCommas( d.values.count ); } )
      .transition()
      .attr({
        x: xScale.rangeBand() / 2,
        y: function ( d ) { return ( height - yScale( d.values.count ) - 4 ); },
        class: 'bar__label'
      });

  // Brush
  var brush = d3.svg.brush()
      .x( xScale );

  var brushGroup = d3.select( barWrap[0].parentNode.parentNode ).append( 'g' )
      .attr( 'class', 'brush' )
      .call( brush );

  brushGroup.selectAll( 'rect' )
      .attr( 'height', height + margin.top );

  brushGroup.datum( { brush: brush } );

  bindListeners.bindBrushListeners( brush, xScale );

};

// Totally jacked from http://stackoverflow.com/questions/18661359/d3-brush-multiple-brushes
function clearBrushes( brush ) {
  d3.selectAll( '.brush' ) 
      .filter( function( d ) { return d.brush != brush; } )
      .each( function( d ) { d3.select( this ).call( d.brush.clear() ); } );
}

exports.initViz = initViz;
exports.updateViz = updateViz;
exports.clearBrushes = clearBrushes;
