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

// from http://stackoverflow.com/questions/3885817/how-to-check-if-a-number-is-float-or-integer
var isInt = function(n) { return parseInt(n) === n };

exports.querySelector = querySelector;
exports.isInt = isInt;
exports.blueMap = blueMap;
