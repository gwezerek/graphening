/**
*
* Colors
*
**/

'use strict';

var d3 = require( 'd3' );
var _ = require( 'underscore' );
var utils = require( '../utils' );
var templateColors = require( '../templates/colors.hbs' );

var columnColors = [ 'white', 'blue' , 'black', 'red', 'green', 'multicolor', 'undefined' ];
var dimensions = [ 'cmc', 'power', 'toughness' ];

// Compile the template
_.each( columnColors, function( color ) {
  document.querySelector( '#colors' ).innerHTML += templateColors( { 'color': color } );
});

var margin = { top: 20, right: 0, bottom: 20, left: 0 };
var parentEls = document.querySelector( '.color__column' );
var width = parentEls.offsetWidth - margin.left - margin.right;
var height = 100 - margin.top - margin.bottom;
var domains = {};
var data = {};

var xScale = d3.scale.ordinal()
    .rangeRoundBands( [ 0, width ], 0.25 );

var yScale = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale( xScale )
    .orient( 'bottom' );

// // Create graph
var svg = d3.select( '#color__column--white' ).append( 'svg' )
    .attr( 'width', width + margin.left + margin.right )
    .attr( 'height', height + margin.top + margin.bottom );

var chart = svg.append( 'g' )
    .attr( 'width', width )
    .attr( 'height', height )
    .attr( 'transform', 'translate( ' + margin.left + ',' + margin.top +' )' );

var xAxis = svg.append( 'g' )
    .attr( 'class', 'axis axis__x' )
    .attr( 'transform', 'translate( 0,' + ( height + margin.top ) +' )' )
    .call( xAxis );

var xAxisLabels = xAxis.selectAll( 'text' )
    .attr('class', 'axis__x__label');

var xAxisPath = xAxis.selectAll( 'path' )
    .attr('class', 'axis__x__path');


function updateViz() {

  // Assume we start with a flat list of all the selected cards
  // This will happen in a different file eventually
  data = getDragons().cards;

  // set the domains across colors
  getXDomains();

  // group the cards by color
  groupByColor();

  // update all viz
  updateAllViz();


  // var cmc = d3.nest()
		//   .key( function( d ) { return d.cmc; } )
		//   .rollup( function( d ) {
		// 		  return d.length;
		//   }).entries( data );

  // var bars = chart.selectAll('rect')
  //   .data( cmc );

  // bars.enter().append( 'rect' );

  // bars.transition()
  //     .attr({
  //       height: function( d ) { return height - yScale( d.values ); },
  //       width: xScale.rangeBand(),
  //       x: function( d ) { return xScale( +d.key ); },
  //       y: function( d ) { return yScale( d.values ); },
  //       class: 'bar__rect'
  //     });

  // data = _.filter( data, function( card ) {
  //     return _.isNumber( +card.power ) && _.isNumber( +card.toughness ) && card.cmc;
  // });

}

function updateAllViz() {
  // for each color, loop through the dimensions and create the bar graph
  _.each( columnColors, function( color ) {
    _.each( dimensions, function( dimension ) {
      drawViz( color, dimension );
    });
  });
}

function drawViz( color, dimension ) {

  // update x and y domains
  // update x-axis
  // update bars

}

function groupByColor() {

}

function getXDomains() {
  // for each dimension set the domains
  _.each( dimensions, function( dimension ) {
    domains[ 'xDomain' ][ dimension ] = d3.extent( data, function( card ) {
      if ( _.isNumber( +card[ dimension ] ) ) {
        return +card[ dimension ];
      }
    });
  });
}

function setXDomain( dimension ) {
  xScale.domain( dimension.xDomain );
}

function setYDomain( dimension ) {
  yScale.domain( dimension.yDomain );
}

function getDragons() {
	return _.findWhere( data, { name: "Dragons of Tarkir" } );
}

function init( loadedJSON ) {
  data = _.toArray( loadedJSON );
  updateViz();
}

module.exports = init;

