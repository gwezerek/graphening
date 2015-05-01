/**
*
* App State
*
**/

'use strict';

var allCards = {};
var currentCards = {};
var filterEls = [];
var filters = [
	{
		'dimension': 'set',
		'values': [ 'Dragons of Tarkir' ]
	}, {
		'dimension': 'rarity',
		'values': []
	}, {
		'dimension': 'types',
		'values': []
	}, {
		'dimension': 'subtypes',
		'values': []
	}
];


exports.allCards = allCards;
exports.currentCards = currentCards;
exports.filterEls = filterEls;
exports.filter = filters;
