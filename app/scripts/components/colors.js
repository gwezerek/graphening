/**
*
* Colors
*
**/

'use strict';

var d3 = require( 'd3' );
var _ = require( 'underscore' );
var utils = require( '../utils' );
var appState = require( '../app-state' );
var bars = require( './bars' );
// var bubbles = require( './bubbles' );
var inventory = require( './inventory' );

// Local vars
var groupedByColor = {};

var prepData = function() {

  // group the cards by color
  groupByColor();

  // get rollups for each dimension
  appState.currentRollups = getAllRollups();

  // set the y maxima across colors
  getDimensionMaxima();

}

var updateViews = function( init ) {
  updateCardTotals();

  _.each( appState.colors, function( color ) {
    _.each( appState.dimensions, function( dimension ) {
      updateUndefinedTotals( color, dimension );
      vizDispatch( color, dimension, init );
    });
  });
}


function groupByColor() {
  groupedByColor = _.groupBy( appState.currentCards, function( card ) {
    if ( card.colors && _.contains( appState.colors, card.colors.toString().toLowerCase() ) ) {
      return card.colors.toString().toLowerCase();
    } else if ( _.isUndefined( card.colors ) ) {
      return 'colorless';
    } else {
      return 'multicolor';
    }
  });
}

function updateCardTotals() {
  _.each( groupedByColor, function( color, key ) {
    document.querySelector( '#card__total--' + key ).innerHTML = groupedByColor[ key ].length;
  });
}

function getAllRollups() {

  var rollups = {};

  _.each( appState.colors, function( color ) {
    rollups[ color ] = {};
    _.each( appState.dimensions, function( dimension ) {
      rollups[ color ][ dimension ] = {};
      rollups[ color ][ dimension ].undefined = 0;

      // get the rollup values
      if ( dimension === 'cmc' || dimension === 'power' || dimension === 'toughness' ) {
        rollups[ color ][ dimension ].rollup = rollupByDimensionQuantitative( color, dimension, rollups );
      } else {
        rollups[ color ][ dimension ].rollup = rollupByDimensionCategorical( color, dimension, rollups );
        rollups = sortCategoricalNest( color, dimension, rollups );
      }

      // remove undefined
      if ( rollups[ color ][ dimension ].undefined ) {
        rollups[ color ][ dimension ].rollup = _.reject( rollups[ color ][ dimension ].rollup, function( agg ){ return agg.key === 'undefined'; } )
      }

    });
  });

  return rollups;
}

function rollupByDimensionQuantitative( color, dimension, rollups ) {

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

function rollupByDimensionCategorical( color, dimension, rollups ) {
  var rollup = d3.nest()
      .key( function( d ) {
        if ( !d[ dimension ] ) {
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

function sortCategoricalNest( color, dimension, rollups ) {
  rollups[color][dimension].rollup.sort( function( a, b ) {
    return b.values - a.values;
  });

  return rollups;
}

function getDimensionMaxima() {
  _.each( appState.dimensions, function( dimension ) {
    var flatArrayValues = [];

    _.each( appState.currentRollups, function( color ) {
      var values = _.pluck( color[ dimension ].rollup, 'values' );
      flatArrayValues = _.union( flatArrayValues, values );
    });

    // get max
    appState.dimensionMaxima[ dimension ] = d3.max( flatArrayValues );
  });
}

function updateUndefinedTotals( color, dimension ) {
  if ( appState.currentRollups[ color ][ dimension ].undefined ) {
    document.querySelector( '#card__undefined--' + dimension + '--' + color ).innerHTML = appState.currentRollups[ color ][ dimension ].undefined;
  }
}

function vizDispatch( color, dimension, init ) {
  if ( dimension === 'cmc' || dimension === 'power' || dimension === 'toughness' ) {
    if ( init ) {
      bars.initViz( color, dimension );
    } else {
      bars.updateViz( color, dimension );
    }
  } else if ( dimension === 'rarity' ) {
    // if ( init ) {
    //   bubbles.initViz( color, dimension );
    // } else {
    //   bubbles.updateViz( color, dimension );
    // }
  } else {
    inventory.updateInventory( color, dimension );
  }
}

exports.prepData = prepData;
exports.updateViews = updateViews;

// function setValueDomains( dimension ) {
//   yScale.domain( [ 0, appState.dimensionMaxima[ dimension ] ] );
//   rScale.domain( [ 0, appState.dimensionMaxima[ dimension ] ] );
// }

// function drawBar( color, dimension ) {

//   var svg = d3.select( '#color__graph--' + dimension + '--' + color ).append( 'svg' )
//       .attr( 'width', width + margin.left + margin.right )
//       .attr( 'height', height + margin.top + margin.bottom );

//   var chart = svg.append( 'g' )
//       .attr( 'width', width )
//       .attr( 'height', height )
//       .attr( 'transform', 'translate( ' + margin.left + ',' + margin.top +' )' );

//   var xAxisEl = svg.append( 'g' )
//       .attr( 'class', 'axis axis__x' )
//       .attr( 'transform', 'translate( 0,' + ( height + margin.top ) +' )' )
//       .call( xAxis );

//   var xAxisLabels = xAxisEl.selectAll( 'text' )
//       .attr( 'y', 5 )
//       .attr( 'class', 'axis__x__label');

//   var xAxisPath = xAxisEl.selectAll( 'path' )
//       .attr('class', 'axis__x__path');


//   // Update bar groups
//   var barWrap = chart.selectAll( 'g' )
//       .data( rollups[ color ][ dimension ].rollup );

//   var barEnter = barWrap.enter().append( 'g' );

//   barWrap.transition()
//       .attr({
//         class: 'bar__wrap',
//         transform: function( d ) { return 'translate(' + xScale( d.key ) + ', ' + yScale( d.values ) + ')'; }
//       });

//   barWrap.exit()
//       .remove();

//   // Update bars
//   barEnter.append( 'rect' );

//   var bars = barWrap.selectAll( 'rect' )
//       .data( function( d ) { return [ d ]; } );

//   bars.attr({
//         height: function( d ) { return height - yScale( d.values ); },
//         width: xScale.rangeBand(),
//         class: 'bar__rect'
//       });

//   // Update labels
//   barEnter.append( 'text' );

//   var labels = barWrap.selectAll( 'text' )
//       .text( function( d ) { return d.values; })
//       .attr({
//         x: xScale.rangeBand() / 2,
//         y: -4,
//         class: 'bar__label'
//       });
// }

// function drawBubbles( color, dimension ) {

//   var height = ( width / 2 + 24 ) * bubbleDomain.length;
//   var marginTop = width / 4 + 20;
//   var marginBottom = width / 4;

//   var svg = d3.select( '#color__graph--' + dimension + '--' + color ).append( 'svg' )
//       .attr( 'width', width )
//       .attr( 'height', height + marginTop + marginBottom );

//   var chart = svg.append( 'g' )
//       .attr( 'width', width )
//       .attr( 'height', height )
//       .attr( 'transform', 'translate( 0,' + marginTop + ')' );

//   // Update bar groups
//   var bubbleWrap = chart.selectAll( 'g' )
//       .data( rollups[ color ][ dimension ].rollup );

//   var bubbleEnter = bubbleWrap.enter().append( 'g' );

//   bubbleWrap.transition()
//       .attr({
//         class: 'bubble__wrap',
//         transform: function( d ) { return 'translate(' + width / 2 + ', ' + bubbleScale( d.key ) + ')'; }
//       });

//   bubbleWrap.exit()
//       .remove();

//   // Update bubbles
//   bubbleEnter.append( 'circle' );

//   var bubbles = bubbleWrap.selectAll( 'circle' )
//       .data( function( d ) { return [ d ]; } );

//   bubbles.attr({
//         r: function( d ) { return rScale( d.values ); },
//         class: 'bubble__circle'
//       });

//   // Update value labels
//   bubbleEnter.append( 'text' )
//     .attr( 'class', 'bubble__label bubble__label--value' );

//   var valueLabels = bubbleWrap.selectAll( '.bubble__label--value' )
//       .text( function( d ) { return d.values; } )
//       .attr( 'y', 3 );

//   // Update key labels
//   bubbleEnter.append( 'text' )
//       .attr( 'class', 'bubble__label bubble__label--key' );

//   var keyLabels = bubbleWrap.selectAll( '.bubble__label--key' )
//       .text( function( d ) { return d.key; } )
//       .attr( 'y', -width / 4 - 10 );

// }




