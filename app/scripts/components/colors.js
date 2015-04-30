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
var templateColorsInventory = require( '../templates/colors-inventory.hbs' );

var columnColors = [ 'white', 'blue' , 'black', 'red', 'green', 'multicolor', 'colorless' ];
var dimensions = [ 'cmc', 'power', 'toughness', 'rarity', 'types', 'subtypes' ];

// Compile the template
document.querySelector( '#colors' ).innerHTML += templateColors( { 'color': columnColors } );

var margin = { top: 15, right: 0, bottom: 15, left: 0 };
var graphEl = document.querySelector( '.color__graph__wrap' );
var width = graphEl.clientWidth - margin.left - margin.right;
var height = 100 - margin.top - margin.bottom;
var barDomain = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9+', '*' ];
var valueMaxes = {};
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

// Bubble chart vars
var bubbleDomain = [ 'Common', 'Uncommon', 'Rare', 'Mythic Rare', 'Basic Land'  ]

var bubbleScale = d3.scale.ordinal()
    .domain( bubbleDomain )
    .rangeRoundBands( [ 0, ( width / 2 + 35 ) * bubbleDomain.length ], .5, 0 );

var rScale = d3.scale.sqrt()
    .range( [ 0, width / 4 ] );

function updateViz() {

  // Assume we start with a flat list of all the selected cards
  // This will happen in a different file eventually
  data = getDragons().cards;

  // group the cards by color
  groupByColor();

  // update the card totals
  updateCardTotals();

  // get rollups for each dimension
  getAllRollups();

  // set the y maxes across colors
  getValueMaxes();

  // update all viz
  updateAllViz();

}

function updateAllViz() {
  // for each color, loop through the dimensions and create the bar graph
  _.each( columnColors, function( color ) {
    _.each( dimensions, function( dimension ) {
      setValueDomains( dimension );
      updateDefinedTotals( color, dimension );
      vizDispatch( color, dimension );
    });
  });
}

function vizDispatch( color, dimension ) {

  if ( dimension === 'cmc' || dimension === 'power' || dimension === 'toughness' ) {
    drawBar( color, dimension );
  } else if ( dimension === 'rarity' ) {
    drawBubbles( color, dimension );
  } else {
    compileInventory( color, dimension );
  }

}

function drawBar( color, dimension ) {

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

function drawBubbles( color, dimension ) {

  var height = ( width / 2 + 24 ) * bubbleDomain.length;
  var marginTop = width / 4 + 20;
  var marginBottom = width / 4;

  var svg = d3.select( '#color__graph--' + dimension + '--' + color ).append( 'svg' )
      .attr( 'width', width )
      .attr( 'height', height + marginTop + marginBottom );

  var chart = svg.append( 'g' )
      .attr( 'width', width )
      .attr( 'height', height )
      .attr( 'transform', 'translate( 0,' + marginTop + ')' );

  // Update bar groups
  var bubbleWrap = chart.selectAll( 'g' )
      .data( rollups[ color ][ dimension ].rollup );

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

function compileInventory( color, dimension ) {
  var inventoryStr = '';
  var ol = document.querySelector( '#color__graph__ol--' + dimension + '--' + color );

  _.each( rollups[ color ][ dimension ].rollup, function( key ) {
    inventoryStr += templateColorsInventory( { 'key': key.key, 'value': key.values } );
  });

  ol.innerHTML = inventoryStr;
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
        sortCategoricalNest( color, dimension );
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
      .key( function( d ) {
        if ( _.isArray( d[ dimension ] ) ) {
          return d[ dimension ].join('/');
        } else if ( !d[ dimension ] ) {
          rollups[ color ][ dimension ].undefined += 1;
          return 'undefined';
        } else {
          return d[ dimension ];
        }
      }).sortValues( function( a, b ) { return a.length - b.length; } )
      .rollup( function( cards ) { return cards.length; } )
      .entries( groupedByColor[ color ] );

  return rollup;
}

function sortCategoricalNest( color, dimension ) {
  rollups[color][dimension].rollup.sort( function( a, b ) {
    return b.values - a.values;
  });
}

function getValueMaxes() {
  _.each( dimensions, function( dimension ) {
    valueMaxes[ dimension ] = 0;

    var flatArrayValues = [];

    _.each( rollups, function( color ) {
      var values = _.pluck( color[ dimension ].rollup, 'values' );
      flatArrayValues = _.union( flatArrayValues, values );
    });

    // get max
    valueMaxes[ dimension ] = d3.max( flatArrayValues );
  });
}

function setValueDomains( dimension ) {
  yScale.domain( [ 0, valueMaxes[ dimension ] ] );
  rScale.domain( [ 0, valueMaxes[ dimension ] ] );
}

function updateCardTotals() {
  _.each( groupedByColor, function( color, key ) {
    document.querySelector( '#card__total--' + key ).innerHTML = groupedByColor[ key ].length;
  });
}

function updateDefinedTotals( color, dimension ) {
  if ( rollups[ color ][ dimension ].undefined ) {
    document.querySelector( '#card__undefined--' + dimension + '--' + color ).innerHTML = rollups[ color ][ dimension ].undefined;
  }
}

function getDragons() {
	return _.findWhere( data, { name: 'Dragons of Tarkir' } );
}

function init( loadedJSON ) {
  data = _.toArray( loadedJSON );
  updateViz();
}

module.exports = init;

