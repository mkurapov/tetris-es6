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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Tetrominos = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var KEY = { ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
	var coloursMap = {
	  'E': '#f4eded',
	  'B': '#8CA4D4',
	  'O': '#FDCDA7',
	  'P': '#C2A1DA',
	  'R': '#EF8B8B',
	  'Y': '#FAF1A2',
	  'C': '#D6E9F8',
	  'G': '#C5D9A6'
	};
	
	var Tetris = function () {
	  function Tetris(canvas) {
	    var _this = this;
	
	    _classCallCheck(this, Tetris);
	
	    this.canvas = canvas;
	    this.ctx = canvas.getContext("2d");
	    this.scaleFactor = 32;
	    this.speed = 10;
	    this.gameState = 1; //1 playing, 0 over
	    this.rows = 20;
	    this.columns = 10;
	    this.gameBoard = []; //make 10*20 game board
	    this.currentTet = {};
	
	    for (var i = 0; i < this.rows; i++) {
	      var rowsTemp = Array(this.columns).fill('E');
	      this.gameBoard.push(rowsTemp);
	    }
	
	    document.addEventListener('keydown', function (ev) {
	      return _this.keyDown(ev);
	    }, false);
	  }
	
	  _createClass(Tetris, [{
	    key: 'drawRect',
	    value: function drawRect(x, y, colour) {
	      var scaledX = x * this.scaleFactor;
	      var scaledY = y * this.scaleFactor;
	      this.ctx.fillStyle = colour;
	      this.ctx.fillRect(scaledX, scaledY, this.scaleFactor, this.scaleFactor);
	
	      this.ctx.strokeStyle = "white";
	      this.ctx.lineWidth = 0.5;
	      this.ctx.strokeRect(scaledX, scaledY, this.scaleFactor, this.scaleFactor);
	    }
	  }, {
	    key: 'renderGameBoard',
	    value: function renderGameBoard() {
	
	      for (var y = 0; y < this.rows; y++) {
	        for (var x = 0; x < this.columns; x++) {
	          var colourOfBlock = coloursMap[this.gameBoard[y][x]];
	          this.drawRect(x, y, colourOfBlock);
	        }
	      }
	    }
	  }, {
	    key: 'redrawPiece',
	    value: function redrawPiece() {
	      this.insertTetromino();
	      this.renderGameBoard();
	    }
	  }, {
	    key: 'validMove',
	    value: function validMove(piece) {
	
	      var n = piece.matrix.length;
	
	      for (var y = 0; y < n; y++) {
	        for (var x = 0; x < n; x++) {
	          var boardXOffset = piece.x + x;
	          var boardYOffset = piece.y + y;
	
	          if (this.currentTet.matrix[y][x] !== 'E') {
	
	            //try to get gameboard at board offsets, if exception, then piece is out of bounds
	            try {
	              console.log('boardX: ' + boardXOffset + ' len: ' + this.columns);
	              if (boardXOffset >= this.columns) {
	                throw new Error('hit something');
	              }
	              var bounds = this.gameBoard[boardYOffset][boardXOffset];
	
	              if (bounds !== 'E' || boardXOffset >= this.columns) {
	                throw new Error('hit something');
	              }
	            } catch (e) {
	              console.log('out of index');
	              return false;
	            }
	          }
	        }
	      }
	
	      console.log('------------');
	
	      return true;
	    }
	  }, {
	    key: 'clearTetromino',
	    value: function clearTetromino() {
	      var n = this.currentTet.matrix.length;
	
	      for (var y = 0; y < n; y++) {
	        for (var x = 0; x < n; x++) {
	          var boardXOffset = this.currentTet.x + x;
	          var boardYOffset = this.currentTet.y + y;
	          if (this.currentTet.matrix[y][x] !== 'E') this.gameBoard[boardYOffset][boardXOffset] = 'E';
	        }
	      }
	    }
	  }, {
	    key: 'insertTetromino',
	    value: function insertTetromino() {
	
	      var n = this.currentTet.matrix.length;
	
	      for (var y = 0; y < n; y++) {
	        for (var x = 0; x < n; x++) {
	          var boardXOffset = this.currentTet.x + x;
	          var boardYOffset = this.currentTet.y + y;
	          if (this.currentTet.matrix[y][x] !== 'E') this.gameBoard[boardYOffset][boardXOffset] = this.currentTet.matrix[y][x]; //inital check will make sure not out of bounds
	        }
	      }
	    }
	  }, {
	    key: 'handleRotation',
	    value: function handleRotation() {
	      this.clearTetromino();
	
	      var copyPiece = new _Tetrominos.Tetromino();
	      copyPiece.x = this.currentTet.x;
	      copyPiece.y = this.currentTet.y;
	      copyPiece.matrix = this.currentTet.matrix;
	      copyPiece.orientation = this.currentTet.orientation;
	
	      //console.log(copyPiece.matrix.join('\n'));
	
	      copyPiece.rotate();
	
	      //console.log(copyPiece.matrix.join('\n'));
	
	      if (this.validMove(copyPiece)) {
	        this.currentTet.rotate();
	      }
	
	      this.redrawPiece();
	    }
	  }, {
	    key: 'checkBottom',
	    value: function checkBottom() {
	      var n = this.currentTet.matrix.length;
	      for (var i = 0; i < n; i++) {}
	    }
	  }, {
	    key: 'spawnTetromino',
	    value: function spawnTetromino() {
	      var tet2 = new _Tetrominos.TetrominoL();
	      this.currentTet = tet2;
	      this.insertTetromino();
	      this.renderGameBoard();
	    }
	  }, {
	    key: 'makeMove',
	    value: function makeMove(direction) {
	      this.clearTetromino();
	      var copyPiece = new _Tetrominos.Tetromino();
	      copyPiece.x = this.currentTet.x;
	      copyPiece.y = this.currentTet.y;
	      copyPiece.matrix = this.currentTet.matrix;
	
	      switch (direction) {
	        case KEY.DOWN:
	          copyPiece.moveDown();
	          if (this.validMove(copyPiece)) {
	            this.checkBottom();
	            this.currentTet.moveDown();
	          } else {
	            this.checkRows();
	            this.spawnTetromino();
	          }
	          break;
	        case KEY.RIGHT:
	          copyPiece.moveRight();
	          if (this.validMove(copyPiece)) this.currentTet.moveRight();
	          break;
	        case KEY.LEFT:
	          copyPiece.moveLeft();
	          if (this.validMove(copyPiece)) this.currentTet.moveLeft();
	          break;
	      }
	
	      this.redrawPiece();
	    }
	  }, {
	    key: 'keyDown',
	    value: function keyDown(ev) {
	      switch (ev.keyCode) {
	        case KEY.UP:
	          this.handleRotation();
	          break;
	        case KEY.DOWN:
	          this.makeMove(KEY.DOWN);
	          break;
	        case KEY.RIGHT:
	          this.makeMove(KEY.RIGHT);
	          break;
	        case KEY.LEFT:
	          this.makeMove(KEY.LEFT);
	          break;
	      }
	      console.clear();
	      console.log(this.gameBoard.join('\n'));
	      console.log(this.gameBoard[2].length);
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	
	      this.currentTet = new _Tetrominos.TetrominoJ();
	
	      this.insertTetromino();
	
	      this.renderGameBoard();
	    }
	  }]);
	
	  return Tetris;
	}();
	
	exports.default = Tetris;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tetromino = exports.Tetromino = function () {
	  function Tetromino() {
	    _classCallCheck(this, Tetromino);
	
	    this.orientation = 'u';
	    this.matrix = [];
	    this.x = 3;
	    this.y = 1;
	  }
	
	  _createClass(Tetromino, [{
	    key: 'rotate',
	    value: function rotate() {
	      var n = this.matrix.length;
	
	      var newArray = [];
	      for (var i = 0; i < n; i++) {
	        var rowsTemp = Array(n).fill([]);
	        newArray.push(rowsTemp);
	      }
	
	      for (var y = 0; y < n; y++) {
	        for (var x = 0; x < n; x++) {
	          newArray[y][x] = this.matrix[n - x - 1][y];
	        }
	      }
	
	      this.matrix = newArray;
	      this.updateOrientation();
	    }
	  }, {
	    key: 'updateOrientation',
	    value: function updateOrientation() {
	      var orientationArray = ['u', 'r', 'd', 'l'];
	      var oldOrientation = this.orientation;
	
	      var newOrientIndex = (orientationArray.indexOf(oldOrientation) + 1) % 4;
	      this.orientation = orientationArray[newOrientIndex];
	    }
	  }, {
	    key: 'moveRight',
	    value: function moveRight() {
	      this.x += 1;
	    }
	  }, {
	    key: 'moveLeft',
	    value: function moveLeft() {
	      this.x -= 1;
	    }
	  }, {
	    key: 'moveDown',
	    value: function moveDown() {
	      this.y += 1;
	    }
	  }, {
	    key: 'moveUp',
	    value: function moveUp() {
	      this.y -= 1;
	    }
	  }]);
	
	  return Tetromino;
	}();
	
	var TetrominoL = exports.TetrominoL = function (_Tetromino) {
	  _inherits(TetrominoL, _Tetromino);
	
	  function TetrominoL() {
	    _classCallCheck(this, TetrominoL);
	
	    var _this = _possibleConstructorReturn(this, (TetrominoL.__proto__ || Object.getPrototypeOf(TetrominoL)).call(this));
	
	    _this.colour = 'B';
	    _this.matrix = [['B', 'E', 'E'], ['B', 'B', 'B'], ['E', 'E', 'E']];
	    return _this;
	  }
	
	  return TetrominoL;
	}(Tetromino);
	
	var TetrominoJ = exports.TetrominoJ = function (_Tetromino2) {
	  _inherits(TetrominoJ, _Tetromino2);
	
	  function TetrominoJ() {
	    _classCallCheck(this, TetrominoJ);
	
	    var _this2 = _possibleConstructorReturn(this, (TetrominoJ.__proto__ || Object.getPrototypeOf(TetrominoJ)).call(this));
	
	    _this2.colour = 'J';
	    _this2.matrix = [['E', 'E', 'O'], ['O', 'O', 'O'], ['E', 'E', 'E']];
	    return _this2;
	  }
	
	  return TetrominoJ;
	}(Tetromino);
	
	var TetrominoZ = exports.TetrominoZ = function (_Tetromino3) {
	  _inherits(TetrominoZ, _Tetromino3);
	
	  function TetrominoZ() {
	    _classCallCheck(this, TetrominoZ);
	
	    var _this3 = _possibleConstructorReturn(this, (TetrominoZ.__proto__ || Object.getPrototypeOf(TetrominoZ)).call(this));
	
	    _this3.colour = 'R';
	    _this3.matrix = [['R', 'R', 'E'], ['E', 'R', 'R'], ['E', 'E', 'E']];
	    return _this3;
	  }
	
	  return TetrominoZ;
	}(Tetromino);
	
	var TetrominoS = exports.TetrominoS = function (_Tetromino4) {
	  _inherits(TetrominoS, _Tetromino4);
	
	  function TetrominoS() {
	    _classCallCheck(this, TetrominoS);
	
	    var _this4 = _possibleConstructorReturn(this, (TetrominoS.__proto__ || Object.getPrototypeOf(TetrominoS)).call(this));
	
	    _this4.colour = 'G';
	    _this4.matrix = [['E', 'G', 'G'], ['G', 'G', 'E'], ['E', 'E', 'E']];
	    return _this4;
	  }
	
	  return TetrominoS;
	}(Tetromino);
	
	var TetrominoI = exports.TetrominoI = function (_Tetromino5) {
	  _inherits(TetrominoI, _Tetromino5);
	
	  function TetrominoI() {
	    _classCallCheck(this, TetrominoI);
	
	    var _this5 = _possibleConstructorReturn(this, (TetrominoI.__proto__ || Object.getPrototypeOf(TetrominoI)).call(this));
	
	    _this5.colour = 'C';
	    _this5.matrix = [['E', 'E', 'E', 'E'], ['C', 'C', 'C', 'C'], ['E', 'E', 'E', 'E'], ['E', 'E', 'E', 'E']];
	    return _this5;
	  }
	
	  return TetrominoI;
	}(Tetromino);

/***/ }
/******/ ])
});
;
//# sourceMappingURL=Tetris.js.map