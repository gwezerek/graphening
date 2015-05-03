/**
*
* Bind Listeners
*
**/

'use strict';

var $ = require( 'jquery' );
var _ = require( 'underscore' );
var appState = require( '../app-state' );
var filterCards = require( './filter-cards' );
var updateViews = require( './update-views' );
var cards = require( './cards' );

function init() {
	bindFilterListeners();
	bindStickyListener();
	bindCardsListenerGrid();
	bindCardsListenerAdd();
}

function bindFilterListeners() {
	appState.filterEls.on( 'change', function() {
		_.each( appState.filterEls, function( el, i ) {
			appState.filters[ i ].values = el.selectize.getValue();
		});

		filterCards();
		updateViews();
	});
}

function stickyNav() {     
	if ( $( window ).scrollTop() > appState.stickyNavTop ) { 
	    $( '.site__header__stickymod' ).addClass( 'stickymod--is--sticky' );
		$( '.stream' ).addClass( 'stream--is--sticky' );
	} else {
	    $( '.site__header__stickymod' ).removeClass( 'stickymod--is--sticky' );
		$( '.stream' ).removeClass( 'stream--is--sticky' ); 
	}
}

function bindStickyListener() {
	appState.stickyNavTop = $( '.site__header__stickymod' ).offset().top;
	var throttled = _.throttle( stickyNav, 1 );
	
	$( window ).scroll( throttled );
}

function bindCardsListenerGrid() {
	$( '.site__header__stickymod' ).on( 'click', '.cards__btn--cardview--open', function() {
		$( '.site__header__stickymod' ).toggleClass( 'stickymod--is--open' );
		$( 'html' ).toggleClass( 'is--frozen' );
		cards.addImages();
	});
	$( '.site__header__stickymod' ).on( 'click', '.cards__btn--cardview--close', function() {
		$( '.site__header__stickymod' ).toggleClass( 'stickymod--is--open' );
		$( 'html' ).toggleClass( 'is--frozen' );
	});
}

function bindCardsListenerAdd() {
	$( '.cards__btn--add' ).on( 'click', function() {
		cards.addImages();
	});
}

module.exports = init;
