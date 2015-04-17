/**
*
* Scatter
*
**/

'use strict';

var d3 = require( 'd3' );
var _ = require( 'underscore' );
var utils = require( '../utils' );

var margin = { top: 20, right: 20, bottom: 50, left: 50 };
var parentWidth = utils.querySelector( '#scatter__wrap' ).offsetWidth;
var width = parentWidth - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;
var data = {};

var xScale = d3.scale.linear()
    .domain([0, 20])
    .range([0, width]);

var yScale = d3.scale.linear()
    .domain([0, 20])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale( xScale )
    .orient( 'bottom' );

var yAxis = d3.svg.axis()
    .scale( yScale )
    .orient( 'left' );

// Create graph
var svg = d3.select( '#scatter__wrap' ).append( 'svg' )
    .attr( 'width', width + margin.left + margin.right )
    .attr( 'height', height + margin.top + margin.bottom );

svg.append( 'g' )
    .attr( 'class', 'axis axis__x' )
    .attr( 'transform', 'translate( ' + margin.left + ',' + ( height + margin.top ) +' )' )
    .call( xAxis );
 
svg.append( 'g' )
    .attr( 'class', 'axis axis__y' )
    .attr( 'transform', 'translate( ' + margin.left + ',' + margin.top + ' )' )
    .call( yAxis );

function updateScatter() {

  // debugger;

  data = _.filter( data, function( card ) {
      return card.power && card.toughness && card.cmc;
  });

  svg.selectAll( 'circle' )
    .data( data )
  .enter().append( 'circle' )
    .attr( 'class', 'circle' )
    .attr( 'cx', function ( d ) { return xScale( d.cmc ); } )
    .attr( 'cy', function ( d ) { return yScale( d.cmc ); } )
    .attr( 'r', 5 );
}

function init( loadedJSON ) {
  data = _.toArray( loadedJSON );
  updateScatter();
}

module.exports = init;

