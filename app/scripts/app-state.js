/**
*
* App State
*
**/

'use strict';

var allCards = [];
var currentCards = [];
var filteredCards = [];
var currentRollups = [];
var currentSlice = 0;
var dimensionMaxima = {};
var domains = {};
var vizWidth = 0;
var stickyNavTop = 0;
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
exports.filteredCards = filteredCards;
exports.currentRollups = currentRollups;
exports.currentSlice = currentSlice;
exports.dimensionMaxima = dimensionMaxima;
exports.domains = domains;
exports.vizWidth = vizWidth;
exports.stickyNavTop = stickyNavTop;
exports.colors = colors;
exports.dimensions = dimensions;
exports.filterEls = filterEls;
exports.filters = filters;
