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

var columnColors = [ 'white', 'blue' , 'black', 'red', 'green', 'multicolor', 'colorless' ];
var dimensions = [ 'cmc', 'power', 'toughness' ];

// Compile the template
_.each( columnColors, function( color ) {
  document.querySelector( '#colors' ).innerHTML += templateColors( { 'color': color } );
});

var margin = { top: 20, right: 0, bottom: 15, left: 0 };
var parentEls = document.querySelector( '.color__column' );
var width = parentEls.offsetWidth - margin.left - margin.right;
var height = 100 - margin.top - margin.bottom;
var barDomain = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9+', '*' ];
var yMaxes = {};
var rollups = {};
var groupedByColor = {};
var data = {};

var xScale = d3.scale.ordinal()
    .domain( barDomain )
    .rangeRoundBands( [ 0, width ], 0.33, 0 );

var yScale = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale( xScale )
    .outerTickSize( 0 )
    .orient( 'bottom' );


function updateViz() {

  // Assume we start with a flat list of all the selected cards
  // This will happen in a different file eventually
  data = getDragons().cards;

  // group the cards by color
  groupByColor();

  // get rollups for each dimension
  getAllRollups();

  // set the y maxes across colors
  getYMaxes();

  // update all viz
  updateAllViz();

}

function updateAllViz() {
  // for each color, loop through the dimensions and create the bar graph
  _.each( columnColors, function( color ) {
    _.each( dimensions, function( dimension ) {
      setYDomain( dimension );
      drawViz( color, dimension );
    });
  });
}

function drawViz( color, dimension ) {

  // TK get the right parent element
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

  console.log( rollups[ color ][ dimension ].rollup );

  var bars = chart.selectAll('rect')
    .data( rollups[ color ][ dimension ].rollup );

  bars.enter().append( 'rect' );

  bars.transition()
      .attr({
        height: function( d ) { return height - yScale( d.values ); },
        width: xScale.rangeBand(),
        x: function( d ) { return xScale( d.key ); },
        y: function( d ) { return yScale( d.values ); },
        class: 'bar__rect'
      });
}

function groupByColor() {
  groupedByColor = _.groupBy( data, function( card ) {
    if ( card.colors && _.contains( columnColors, card.colors.toString().toLowerCase() ) ) {
      return card.colors.toString().toLowerCase();
    } else if ( _.isUndefined( card.colors ) ) {
      return 'colorless';
    } else {
      return 'multicolor';
    }
  });
}

function getAllRollups() {
  _.each( columnColors, function( color ) {
    rollups[ color ] = {};
    _.each( dimensions, function( dimension ) {
      rollups[ color ][ dimension ] = {};
      rollups[ color ][ dimension ].undefined = 0;

      // get the rollup values
      if ( dimension === 'cmc' || dimension === 'power' || dimension === 'toughness' ) {
        rollups[ color ][ dimension ].rollup = rollupByDimensionQuantitative( color, dimension );
      } else {
        rollups[ color ][ dimension ].rollup = rollupByDimensionCategorical( color, dimension );
      }

      // remove undefined
      if ( rollups[ color ][ dimension ].undefined ) {
        rollups[ color ][ dimension ].rollup = _.reject( rollups[ color ][ dimension ].rollup, function( agg ){ return agg.key === 'undefined'; } )
      }

    });
  });
}

function rollupByDimensionQuantitative( color, dimension ) {
  var rollup = d3.nest()
      .key( function( d ) {
        if ( !d[ dimension ] ) {
          rollups[ color ][ dimension ].undefined += 1;
          return 'undefined';
        } else if ( _.isNaN( +d[ dimension ] ) || !utils.isInt( +d[ dimension ] ) ) {
          return '*';
        } else if ( +d[ dimension ] >= 9 ) {
          return '9+';
        } else {
          return d[ dimension ];
        }
      })
      .rollup( function( cards ) { return cards.length; } )
      .entries( groupedByColor[ color ] );

  return rollup;
}

function rollupByDimensionCategorical( color, dimension ) {
  var rollup = d3.nest()
      .key( function( d ) { return d[ dimension ]; })
      .rollup( function( cards ) { return cards.length; } )
      .entries( groupedByColor[ color ] );

  return rollup;
}

function getYMaxes() {
  _.each( dimensions, function( dimension ) {
    yMaxes[ dimension ] = 0;

    var flatArrayY = [];

    _.each( rollups, function( color ) {
      var values = _.pluck( color[ dimension ].rollup, 'values' );
      flatArrayY = _.union( flatArrayY, values );
    });

    // get max
    yMaxes[ dimension ] = d3.max( flatArrayY );
  });
}

function setYDomain( dimension ) {
  yScale.domain( [ 0, yMaxes[ dimension ] ] );
}

function getDragons() {
	return _.findWhere( data, { name: "Theros" } );
}

function init( loadedJSON ) {
  data = _.toArray( loadedJSON );
  updateViz();
}

module.exports = init;

