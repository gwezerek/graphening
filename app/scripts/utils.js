/**
*
* Utils
*
**/

'use strict';
var d3 = require( 'd3' );

// from http://stackoverflow.com/questions/3885817/how-to-check-if-a-number-is-float-or-integer
// Accepts positive ints, rejects negative, strings and floats
exports.isInt = function(n) { return parseInt(n) === n; };

exports.formatCommas = d3.format('0,000');
