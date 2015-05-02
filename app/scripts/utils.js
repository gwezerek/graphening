/**
*
* Utils
*
**/

'use strict';

// from http://stackoverflow.com/questions/3885817/how-to-check-if-a-number-is-float-or-integer
// Accepts positive ints, rejects negative, strings and floats
var isInt = function(n) { return parseInt(n) === n; };

exports.isInt = isInt;
