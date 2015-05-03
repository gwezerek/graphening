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
var bubbles = require( './bubbles' );
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

  // set the dimension domains across colors
  getDimensionDomains();

  // debugger;

};

var updateViews = function( init ) {
  _.each( appState.colors, function( color ) {
    updateCardTotal( color );
    _.each( appState.dimensions, function( dimension ) {
      updateUndefinedTotals( color, dimension );
      vizDispatch( color, dimension, init );
    });
  });
};


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

function updateCardTotal( color ) {
  if ( groupedByColor[ color ] ) {
    document.querySelector( '#card__total--' + color ).innerHTML = utils.formatCommas( groupedByColor[ color ].length );
  } else {
    document.querySelector( '#card__total--' + color ).innerHTML = 0;
  }
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
        rollups[ color ][ dimension ].rollup = _.reject( rollups[ color ][ dimension ].rollup, function( agg ){ return agg.key === 'undefined'; } );
      }

    });
  });

  return rollups;
}

function rollupByDimensionQuantitative( color, dimension, rollups ) {
  var rollup = [];

  if ( groupedByColor[ color ] ) {
    rollup = d3.nest()
        .key( function( d ) {
          if ( !d[ dimension ] ) {
            rollups[ color ][ dimension ].undefined += 1;
            return 'undefined';
          } else if ( _.isNaN( +d[ dimension ] ) || !utils.isInt( +d[ dimension ] ) || +d[ dimension ] < 0 ) {
            return '*';
          } else if ( +d[ dimension ] >= 9 ) {
            return '9+';
          } else {
            return d[ dimension ];
          }
        })
        .rollup( function( cards ) { return cards.length; } )
        .entries( groupedByColor[ color ] );
  }

  return rollup;
}

function rollupByDimensionCategorical( color, dimension, rollups ) {
  var rollup = [];

  if ( groupedByColor[ color ] ) {
    rollup = d3.nest()
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
  }

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

function getDimensionDomains() {
  _.each( appState.dimensions, function( dimension ) {
    var flatArrayValues = [];

    _.each( appState.currentRollups, function( color ) {
      var values = _.pluck( color[ dimension ].rollup, 'key' );
      flatArrayValues = _.union( flatArrayValues, values );
    });

    // set dimension domain
    appState.domains[ dimension ] = flatArrayValues;
  });
}


function updateUndefinedTotals( color, dimension ) {
  var undefinedEl = document.querySelector( '#card__undefined--' + dimension + '--' + color );

  if ( undefinedEl ) {
    undefinedEl.innerHTML = utils.formatCommas( appState.currentRollups[ color ][ dimension ].undefined );
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
    if ( init ) {
      bubbles.initViz( color, dimension );
    } else {
      bubbles.updateViz( color, dimension );
    }
  } else {
    inventory.updateInventory( color, dimension );
  }
}

exports.prepData = prepData;
exports.updateViews = updateViews;
