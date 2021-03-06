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
	  'E': 'white',
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
	    this.rows = 20;
	    this.columns = 10;
	
	    this.canvas.height = window.innerHeight;
	    this.canvas.width = window.innerHeight / 2;
	    this.scaleFactor = this.canvas.height / this.rows;
	
	    this.ctx = canvas.getContext("2d");
	
	    this.speed = 3;
	    this.score = 0;
	
	    this.gameBoard = []; //make 10*20 game board
	    this.currentTet = {};
	
	    this.resetGameBoard();
	
	    document.addEventListener('keydown', function (ev) {
	      return _this.keyDown(ev);
	    }, false);
	    window.addEventListener('resize', function (ev) {
	      return _this.resizeCanvas(ev);
	    }, false);
	  }
	
	  _createClass(Tetris, [{
	    key: 'resetGameBoard',
	    value: function resetGameBoard() {
	      this.gameBoard = [];
	      for (var i = 0; i < this.rows; i++) {
	        var rowsTemp = Array(this.columns).fill('E');
	        this.gameBoard.push(rowsTemp);
	      }
	      this.score = 0;
	      this.renderGameBoard();
	    }
	  }, {
	    key: 'resizeCanvas',
	    value: function resizeCanvas(ev) {
	      this.canvas.height = window.innerHeight;
	      this.canvas.width = window.innerHeight / 2;
	      this.scaleFactor = this.canvas.height / this.rows;
	      this.renderGameBoard();
	    }
	  }, {
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
	    key: 'drawScore',
	    value: function drawScore() {
	      this.ctx.font = this.scaleFactor * 0.8 + 'px Karla';
	      this.ctx.fillStyle = '#aaaaaa';
	      this.ctx.textAlign = 'right';
	      this.ctx.fillText(this.score, this.scaleFactor * 9.3, this.scaleFactor * 1.3);
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
	      this.drawScore();
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
	
	          if (piece.matrix[y][x] !== 'E') {
	
	            //try to get gameboard at board offsets, if exception, then piece is out of bounds
	            try {
	              var bounds = this.gameBoard[boardYOffset][boardXOffset];
	
	              if (bounds !== 'E' || boardXOffset === this.columns) {
	                throw new Error('hit something');
	              }
	            } catch (e) {
	              return false;
	            }
	          }
	        }
	      }
	
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
	
	      copyPiece.rotate();
	
	      if (this.validMove(copyPiece) && this.bottomEmpty(copyPiece)) {
	        this.currentTet.rotate();
	      }
	
	      this.redrawPiece();
	    }
	  }, {
	    key: 'bottomEmpty',
	    value: function bottomEmpty(piece) {
	      var n = piece.matrix.length;
	
	      for (var y = 0; y < n; y++) {
	        for (var x = 0; x < n; x++) {
	          var boardXOffset = piece.x + x;
	          var boardYOffsetBelow = piece.y + y + 1;
	
	          if (piece.matrix[y][x] !== 'E') {
	
	            //try to get gameboard at board offsets, if exception, then piece is out of bounds
	            try {
	              var bounds = this.gameBoard[boardYOffsetBelow][boardXOffset];
	              if (bounds !== 'E') return false;
	            } catch (e) {
	              return false;
	            }
	          }
	        }
	      }
	
	      return true;
	    }
	  }, {
	    key: 'checkRows',
	    value: function checkRows() {
	      var gameBoardCopy = this.gameBoard;
	
	      for (var row = this.rows - 1; row >= 0; row--) {
	        var filteredRow = gameBoardCopy[row].filter(function (val) {
	          return val === 'E';
	        });
	
	        if (filteredRow.length === 0) {
	          this.gameBoard.splice(row, 1);
	          var rowsTemp = Array(this.columns).fill('E');
	          this.gameBoard.unshift(rowsTemp);
	          this.score += 100;
	          row++;
	        }
	      }
	
	      this.renderGameBoard();
	    }
	  }, {
	    key: 'spawnTetromino',
	    value: function spawnTetromino() {
	      this.checkRows();
	      this.score += 10;
	
	      var tetrominos = [new _Tetrominos.TetrominoI(), new _Tetrominos.TetrominoJ(), new _Tetrominos.TetrominoL(), new _Tetrominos.TetrominoS(), new _Tetrominos.TetrominoZ(), new _Tetrominos.TetrominoO(), new _Tetrominos.TetrominoT()];
	
	      var newTet = tetrominos[Math.floor(Math.random() * tetrominos.length)];
	      if (!this.validMove(newTet)) {
	        this.resetGameBoard();
	      }
	
	      this.currentTet = newTet;
	
	      this.insertTetromino();
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
	            this.currentTet.moveDown();
	          }
	
	          break;
	        case KEY.RIGHT:
	          copyPiece.moveRight();
	          if (this.validMove(copyPiece)) {
	            this.currentTet.moveRight();
	          }
	          break;
	        case KEY.LEFT:
	          copyPiece.moveLeft();
	          if (this.validMove(copyPiece)) {
	            this.currentTet.moveLeft();
	          }
	          break;
	      }
	
	      if (!this.bottomEmpty(this.currentTet)) {
	        this.insertTetromino();
	        this.spawnTetromino();
	      } else {
	        this.redrawPiece();
	      }
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
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      var _this2 = this;
	
	      this.currentTet = new _Tetrominos.TetrominoL();
	
	      this.insertTetromino();
	
	      this.renderGameBoard();
	      window.animateLoop = function () {
	
	        setTimeout(function () {
	          requestAnimationFrame(animateLoop);
	
	          _this2.makeMove(KEY.DOWN);
	          _this2.renderGameBoard();
	        }, 1000 / _this2.speed);
	      };
	
	      animateLoop();
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
	
	      var newArray = Array(n).fill().map(function () {
	        return [];
	      });
	
	      for (var y = 0; y < n; y++) {
	        for (var x = 0; x < n; x++) {
	          newArray[y][x] = this.matrix[n - x - 1][y];
	        }
	      }
	
	      this.matrix = newArray;
	
	      newArray = [];
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
	
	var TetrominoO = exports.TetrominoO = function (_Tetromino6) {
	  _inherits(TetrominoO, _Tetromino6);
	
	  function TetrominoO() {
	    _classCallCheck(this, TetrominoO);
	
	    var _this6 = _possibleConstructorReturn(this, (TetrominoO.__proto__ || Object.getPrototypeOf(TetrominoO)).call(this));
	
	    _this6.colour = 'Y';
	    _this6.matrix = [['Y', 'Y'], ['Y', 'Y']];
	    return _this6;
	  }
	
	  _createClass(TetrominoO, [{
	    key: 'rotate',
	    value: function rotate() {
	      // do nothing
	    }
	  }]);
	
	  return TetrominoO;
	}(Tetromino);
	
	var TetrominoT = exports.TetrominoT = function (_Tetromino7) {
	  _inherits(TetrominoT, _Tetromino7);
	
	  function TetrominoT() {
	    _classCallCheck(this, TetrominoT);
	
	    var _this7 = _possibleConstructorReturn(this, (TetrominoT.__proto__ || Object.getPrototypeOf(TetrominoT)).call(this));
	
	    _this7.colour = 'P';
	    _this7.matrix = [['P', 'P', 'P'], ['E', 'P', 'E'], ['E', 'E', 'E']];
	    return _this7;
	  }
	
	  return TetrominoT;
	}(Tetromino);

/***/ }
/******/ ])
});
;
//# sourceMappingURL=Tetris.js.map