/**
*
* Colors
*
**/

'use strict';

var _ = require( 'underscore' );
var appState = require( '../app-state' );

// Templates
var templateColorsInventory = require( '../templates/partials/colors-inventory.hbs' );

var updateInventory = function( color, dimension ) {
  var inventoryStr = '';
  var ol = document.querySelector( '#color__graph__ol--' + dimension + '--' + color );

  debugger;

  _.each( appState.currentRollups[ color ][ dimension ].rollup, function( key ) {
    inventoryStr += templateColorsInventory( { 'key': key.key, 'value': key.values } );
  });

  ol.innerHTML = inventoryStr;
};

exports.updateInventory = updateInventory;
