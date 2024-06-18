// model.js

var Model = (function() {
	'use strict';
	
	// Private properties and methods
	let data = {};
	
	function init() {
		// Initialize the model data or load it from a source
		data = {
		name: 'My Canvas App',
		color: 'black'
		};
	}
	
	function getData() {
		return data;
	}
	
	// Initialize the Model
	init();
	
	// Public API
	return {
		// init: init,
		getData: getData
	};
})();