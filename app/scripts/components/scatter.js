/**
*
* Scatter
*
**/

(function () {

	'use strict';

	var d3 = require('d3');

	var querySelector = document.querySelector.bind(document);

	function init( loadedJSON ) {
		var data = loadedJSON;
		console.log( querySelector( '#timeline__wrap' ) );
	}

	module.exports = init;

})();
