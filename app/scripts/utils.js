/**
*
* Utils
*
**/

'use strict';

var querySelector = document.querySelector.bind(document);
var blueMap = {
	50:  '#eceff1',
	100: '#cfd8dc',
	200: '#b0bec5',
	300: '#90a4ae',
	400: '#78909c',
	500: '#607d8b',
	600: '#546e7a',
	700: '#455a64',
	800: '#37474f',
	900: '#263238'
};

// from http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
var isInt = function(value) {
  if ( isNaN( value ) ) {
    return false;
  }
  var x = parseFloat( value );
  return ( x | 0 ) === x;
}

exports.querySelector = querySelector;
exports.isInt = isInt;
exports.blueMap = blueMap;
