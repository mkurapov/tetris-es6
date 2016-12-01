(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Tetris", [], factory);
	else if(typeof exports === 'object')
		exports["Tetris"] = factory();
	else
		root["Tetris"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tetris = function () {
	  function Tetris(canvas) {
	    _classCallCheck(this, Tetris);
	
	    this.ctx = canvas.getContext("2d");
	    this.scaleFactor = 32;
	    this.rows = 20;
	    this.columns = 10;
	    this.gameBoard = []; //make 10*20 game board
	    for (var i = 0; i < this.rows; i++) {
	      var rowsTemp = Array(this.columns).fill('E');
	      this.gameBoard.push(rowsTemp);
	    }
	  }
	
	  _createClass(Tetris, [{
	    key: 'drawRect',
	    value: function drawRect(x, y, colour) {
	      var scaledX = x * this.scaleFactor;
	      var scaledY = y * this.scaleFactor;
	      this.ctx.fillStyle = colour || 'pink';
	      this.ctx.fillRect(scaledX, scaledY, this.scaleFactor, this.scaleFactor);
	
	      this.ctx.strokeStyle = "white";
	      this.ctx.lineWidth = 0.5;
	      this.ctx.strokeRect(scaledX, scaledY, this.scaleFactor, this.scaleFactor);
	    }
	  }, {
	    key: 'renderGameBoard',
	    value: function renderGameBoard() {
	      var rand = this.getRandomInt(0, this.columns);
	      console.log(rand);
	      this.gameBoard[0][rand] = 'B';
	
	      var coloursMap = {
	        'E': 'pink',
	        'B': '#8CA4D4',
	        'O': '#FDCDA7',
	        'P': '#C2A1DA',
	        'R': '#EF8B8B',
	        'Y': '#FAF1A2',
	        'C': '#D6E9F8'
	      };
	
	      for (var i = 0; i < this.rows; i++) {
	        for (var j = 0; j < this.columns; j++) {
	          var colourOfBlock = coloursMap[this.gameBoard[i][j]];
	          this.drawRect(j, i, colourOfBlock);
	        }
	      }
	    }
	  }, {
	    key: 'getRandomInt',
	    value: function getRandomInt(min, max) {
	      min = Math.ceil(min);
	      max = Math.floor(max);
	      return Math.floor(Math.random() * (max - min)) + min;
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	
	      this.renderGameBoard();
	    }
	  }]);
	
	  return Tetris;
	}();
	
	exports.default = Tetris;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=Tetris.js.map