/**
*
* App State
*
**/

'use strict';

exports.allCards = [];
exports.allSets = {};
exports.currentCards = [];
exports.filteredCards = [];
exports.isBrushed = false;
exports.currentRollups = [];
exports.currentSlice = 0;
exports.dimensionMaxima = {};
exports.domains = {};
exports.vizWidth = 0;
exports.stickyNavTop = 0;
exports.colors = [ 'white', 'blue' , 'black', 'red', 'green', 'multicolor', 'colorless' ];
exports.dimensions = [ 'cmc', 'power', 'toughness', 'rarity', 'set', 'types', 'subtypes' ];
exports.filterEls = [];
exports.filters = [
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
	}, {
		'dimension': 'artist',
		'values': []
	}
];
