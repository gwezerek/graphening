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

function init() {
	bindFilterListeners();
	bindStickyListener();
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
	var throttled = _.throttle( stickyNav, 50 );
	
	$( window ).scroll( throttled );
}

module.exports = init;
