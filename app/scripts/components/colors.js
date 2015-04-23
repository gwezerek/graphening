/**
*
* Colors
*
**/

'use strict';

// var d3 = require( 'd3' );
// var _ = require( 'underscore' );
// var utils = require( '../utils' );

// var margin = { top: 20, right: 70, bottom: 50, left: 50 };
// var parentWidth = utils.querySelector( '#colors__wrap' ).offsetWidth;
// var width = parentWidth - margin.left - margin.right;
// var height = 500 - margin.top - margin.bottom;
// var data = {};

// var xScale = d3.scale.linear()
//     .domain([-2, 18])
//     .range([0, width]);

// var yScale = d3.scale.linear()
//     .domain([-2, 18])
//     .range([height, 0]);

// var rScale = d3.scale.linear()
//     .domain( [ 0, 1400 ] )
//     .range( [ 1.5, 10 ] );

// var colorScale = d3.scale.linear()
//     .domain( [ 0, 1400 ] )
//     .range( [ utils.blueMap[ '700' ], 'white' ] );

// var xAxis = d3.svg.axis()
//     .scale( xScale )
//     .orient( 'bottom' );

// var yAxis = d3.svg.axis()
//     .scale( yScale )
//     .orient( 'left' );

// // Create graph
// var svg = d3.select( '#scatter__wrap' ).append( 'svg' )
//     .attr( 'width', width + margin.left + margin.right )
//     .attr( 'height', height + margin.top + margin.bottom );

// svg.append( 'g' )
//     .attr( 'class', 'axis axis__x' )
//     .attr( 'transform', 'translate( ' + margin.left + ',' + ( height + margin.top ) +' )' )
//     .call( xAxis );

// svg.append( 'g' )
//     .attr( 'class', 'axis axis__y' )
//     .attr( 'transform', 'translate( ' + margin.left + ',' + margin.top + ' )' )
//     .call( yAxis );

// var chart = svg.append( 'g' )
//     .attr( 'width', width )
//     .attr( 'height', height )
//     .attr( 'transform', 'translate( ' + margin.left + ',' + margin.top +' )' );

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

