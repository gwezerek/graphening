/**
*
* App State
*
**/

'use strict';

var allCards = [];
var currentCards = [];
var currentRollups = [];
var dimensionMaxes = {};
var colors = [ 'white', 'blue' , 'black', 'red', 'green', 'multicolor', 'colorless' ];
var dimensions = [ 'cmc', 'power', 'toughness', 'rarity', 'types', 'subtypes' ];
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
exports.currentRollups = currentRollups;
exports.dimensionMaxes = dimensionMaxes;
exports.colors = colors;
exports.dimensions = dimensions;
exports.filterEls = filterEls;
exports.filters = filters;
