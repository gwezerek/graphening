/**
*
* Filter
*
**/

'use strict';

var _ = require( 'underscore' );
var Handlebars = require( 'hbsfy/runtime' );

var appState = require( '../app-state' );
var selectized = require( './selectized' );
var wrangleData = require( './wrangle-data' )

var index = require( '../templates/index.hbs' );
var templateColors = require( '../templates/components/colors.hbs' );

// Partials
Handlebars.registerPartial( 'filter', require( '../templates/components/filters.hbs' ) );
Handlebars.registerPartial( 'cards', require( '../templates/components/cards.hbs' ) );
Handlebars.registerPartial( 'footer', require( '../templates/components/footer.hbs' ) );

function init( data ) {
	compilePage();

	// Add the filter chrome
	selectized.init();

	// Wrangle data
	wrangleData.getAllCards( data );
	wrangleData.getAllSets( data );

	// Complile the page
	compileColumns();
	setVizWidth();
}

function compilePage() {
	document.body.innerHTML = index();
}

function compileColumns() {
	var colorObj = _.object( appState.colors, [ true, true , true, true, true, false, false ] );
	document.querySelector( '#colors' ).innerHTML += templateColors( { 'color': colorObj } );
}

function setVizWidth() {
	appState.vizWidth = document.querySelector( '.color__graph__wrap' ).clientWidth;
}

module.exports = init;
