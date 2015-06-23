/**
*
* Inventory
*
**/

'use strict';

var _ = require( 'underscore' );
var utils = require( '../utils' );
var appState = require( '../app-state' );

// Templates
var templateColorsInventory = require( '../templates/partials/colors-inventory.hbs' );

var updateInventory = function( color, dimension ) {
  var inventoryStr = '';
  var ol = document.querySelector( '#color__graph__ol--' + dimension + '--' + color );

  _.each( appState.currentRollups[ color ][ dimension ].rollup, function( key ) {
    inventoryStr += templateColorsInventory( { 'key': key.key, 'value': utils.formatCommas( key.values.count ) } );
  });

  ol.innerHTML = inventoryStr;
};

exports.updateInventory = updateInventory;