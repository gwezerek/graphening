/**
*
* Colors
*
**/

'use strict';

var d3 = require( 'd3' );
var _ = require( 'underscore' );
var utils = require( '../utils' );

var margin = { top: 20, right: 0, bottom: 20, left: 0 };
var parentEl = utils.querySelector( '#color__column--white' );
var width = parentEl.offsetWidth - margin.left - margin.right;
var height = 100 - margin.top - margin.bottom;
var data = {};

var xScale = d3.scale.ordinal()
    .domain( [-2, 18] )
    .rangeRoundBands( [ 0, width ], 0.25 );

var yScale = d3.scale.linear()
    .domain([-2, 18])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale( xScale )
    .orient( 'bottom' );

// var yAxis = d3.svg.axis()
//     .scale( yScale )
//     .orient( 'left' );

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



// function updateViz() {

//   data = getComboData();

//   // console.log(data);

//   // data = _.filter( data, function( card ) {
//   //     return _.isNumber( +card.power ) && _.isNumber( +card.toughness ) && card.cmc;
//   // });

//   chart.selectAll( 'circle' )
//     .data( data )
//   .enter().append( 'circle' )
//     .attr( 'class', 'circle' )
//     .attr( 'cx', function ( d ) { return xScale( +d.a ); } )
//     .attr( 'cy', function ( d ) { return yScale( +d.b ); } )
//     .style( 'fill', function ( d ) { return colorScale( d.count ); })
//     // .attr( 'r', 5 );
//     .attr( 'r', function ( d ) { return rScale( d.count ); } );
// }

// function getComboData() {

//   var groupedData = [];

//   _.each( data, function( card ) {
//     var groupAB = _.findWhere( groupedData, { a: card.power, b: card.toughness } );

//     if ( groupAB ) {
//       groupAB.cards.push( card );
//       groupAB.count += 1;
//     } else {
//       groupedData.push({
//         a: card.power,
//         b: card.toughness,
//         count: 0,
//         cards: [ card ]
//       });
//     }
//   });

//   return groupedData;

// }

// function init( loadedJSON ) {
//   data = _.toArray( loadedJSON );
//   updateViz();
// }

// module.exports = init;

