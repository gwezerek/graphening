/**
*
* Bind Listeners
*
**/

'use strict';

var $ = require( 'jquery' );
var d3 = require( 'd3' );
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

		filterCards.filterCards();
		updateViews.updateViews();
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

function bindBrushListeners( brush, xScale ) {
	brush.on( 'brushend', function() {
		// If the user clicks instead of brushing
		if ( brush.empty() ) {
			handleEmptyBrush();
			return;
		}

		var parentEl = this.parentElement;
		var barData = d3.select( parentEl ).selectAll( '.bar__wrap' ).data();
		var extent = brush.extent();
		var selectedIds = [];
		
		_.map( barData, function( bar ) {
			var barStart = xScale( bar.key );
			if ( barStart > ( extent[0] - xScale.rangeBand() ) && barStart < extent[1] ) {
				selectedIds.push.apply( selectedIds, bar.values.ids );
			}
		});

		filterCards.getCardsById( selectedIds );
		cards.update();
	});
}

function handleEmptyBrush() {
	if ( appState.isBrushed ) {
		// reset the view to filtered set
		appState.isBrushed = false;
		appState.currentCards = appState.filteredCards;
		updateViews.updateViews();
	}
}

exports.init = init;
exports.bindBrushListeners = bindBrushListeners;
