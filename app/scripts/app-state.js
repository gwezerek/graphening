/**
*
* App State
*
**/

'use strict';

var allCards = [];
var currentCards = [];
var currentRollups = [];
var dimensionMaxima = {};
var vizWidth = 0;
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
exports.dimensionMaxima = dimensionMaxima;
exports.vizWidth = vizWidth;
exports.colors = colors;
exports.dimensions = dimensions;
exports.filterEls = filterEls;
exports.filters = filters;
