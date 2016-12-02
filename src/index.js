import {Tetromino, TetrominoL, TetrominoJ, TetrominoZ, TetrominoS} from 'Tetrominos'

const KEY     = { ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 }
const coloursMap = {
  'E':'#f4eded',
  'B':'#8CA4D4',
  'O':'#FDCDA7',
  'P':'#C2A1DA',
  'R':'#EF8B8B',
  'Y':'#FAF1A2',
  'C':'#D6E9F8',
  'G':'#C5D9A6'
};

export default class Tetris {

  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.scaleFactor = 32
    this.speed = 10
    this.gameState = 1 //1 playing, 0 over
    this.rows = 20
    this.columns = 10
    this.gameBoard = []; //make 10*20 game board
    this.currentTet = {}

    for (let i = 0; i < this.columns; i++)
    {
      const rowsTemp = Array(this.rows).fill('E')
      this.gameBoard.push(rowsTemp)
    }

    document.addEventListener('keydown', (ev) => this.keyDown(ev), false);
  }
  drawRect(x,y, colour) {
    const scaledX = x * this.scaleFactor
    const scaledY = y * this.scaleFactor
    this.ctx.fillStyle = colour;
    this.ctx.fillRect(scaledX,scaledY, this.scaleFactor, this.scaleFactor);

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth   = 0.5;
    this.ctx.strokeRect(scaledX,scaledY, this.scaleFactor, this.scaleFactor);
  }

  redrawPiece()
  {
    this.insertTetromino()
    this.renderGameBoard()
  }

  checkEmpty(piece)
  {
    const xOffset = piece.x
    const yOffset = piece.y
    const n = piece.matrix.length

    for (let y = 0; y < n; y++)
    {
      for (let x = 0; x < n; x++)
      {
        const blockXOffset = xOffset + x
        const blockYOffset = yOffset + y

        if ((blockXOffset >= this.columns) || (blockYOffset < 0) || (blockYOffset >= this.rows) || (blockXOffset < 0)) return false

        let blocktoCheck = this.gameBoard[blockXOffset][blockYOffset];
        if ((blocktoCheck !== 'E')) return false
      }
    }

    return true
  }

  clearTetromino()
  {
    const xOffset = this.currentTet.x
    const yOffset = this.currentTet.y

    for (let y = 0;y < 3;y++)
    {
      for (let x = 0; x < 3; x++)
      {
        this.gameBoard[xOffset + x][yOffset + y] = 'E'
      }
    }
  }

  insertTetromino()
  {
    const xOffset = this.currentTet.x
    const yOffset = this.currentTet.y

    for (let y = 0;y < 3;y++)
    {
      for (let x = 0; x < 3; x++)
      {
        this.gameBoard[xOffset + x][yOffset + y] = this.currentTet.matrix[x][y]
      }
    }
  }

  renderGameBoard()
  {



    for (let y = 0; y < this.rows; y++)
    {
      for (let x = 0; x < this.columns; x++)
      {
        const colourOfBlock = coloursMap[this.gameBoard[x][y]]
        this.drawRect(x, y, colourOfBlock)
      }
    }
  }

  handleRotation(rotatingClockwise)
  {
    this.clearTetromino();
    this.currentTet.rotate()
    this.redrawPiece()
  }


  handleMove(movingRight)
  {

    this.clearTetromino();

    if (movingRight)
    {
      this.currentTet.moveRight()

      if (!this.checkEmpty(this.currentTet)) this.currentTet.moveLeft()

    }
    else
    {
      this.currentTet.moveLeft()
      if (!this.checkEmpty(this.currentTet)) this.currentTet.moveRight()

    }

    this.redrawPiece()


  }

  handleDrop()
  {
    this.clearTetromino()
    this.currentTet.moveDown()

    if (!this.checkEmpty(this.currentTet)) this.currentTet.moveUp()

    this.redrawPiece()
  }




  keyDown(ev) {
      switch(ev.keyCode) {
        case KEY.UP:
          this.handleRotation(true);
          break;
        case KEY.DOWN:
          this.handleDrop();
          break;
        case KEY.RIGHT:
          this.handleMove(true);
          break;
        case KEY.LEFT:
          this.handleMove(false);
          break;
      }


  }

  run()
  {


    this.currentTet = new TetrominoS()

    this.insertTetromino()
     this.renderGameBoard()



  }

}




