import {Tetromino, TetrominoL, TetrominoJ, TetrominoZ, TetrominoS, TetrominoI} from 'Tetrominos'

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


  redrawPiece()
  {
    this.insertTetromino()
    this.renderGameBoard()
  }

  validMove(piece)
  {

    const n = piece.matrix.length


    for (let y = 0;y < n;y++)
    {
      for (let x = 0; x < n; x++)
      {
        const boardXOffset = piece.x + x
        const boardYOffset = piece.y + y

        console.log('board y: '+piece.x);

        if (this.currentTet.matrix[x][y] !== 'E')
        {
          //try to get gameboard at board offsets, if exception, then piece is out of bounds
          try {
            const bounds = this.gameBoard[boardXOffset][boardYOffset]
            if (bounds !== 'E') {throw new Error('hit something')}

          } catch (e) {
            console.log('out of index');
            return false
          }
        }

      }
    }




    return  true



  }


  clearTetromino()
  {
    const n = this.currentTet.matrix.length

    for (let y = 0;y < n;y++)
    {
      for (let x = 0; x < n; x++)
      {
        const boardXOffset = this.currentTet.x + x
        const boardYOffset = this.currentTet.y + y
        if (this.currentTet.matrix[x][y] !== 'E') this.gameBoard[boardXOffset][boardYOffset] = 'E'
      }
    }
  }

  insertTetromino()
  {

    const n = this.currentTet.matrix.length


    for (let y = 0; y < n; y++)
    {
      for (let x = 0; x < n; x++)
      {
        const boardXOffset = this.currentTet.x + x
        const boardYOffset = this.currentTet.y + y
        if (this.currentTet.matrix[x][y] !== 'E') this.gameBoard[boardXOffset][boardYOffset] = this.currentTet.matrix[x][y] //inital check will make sure not out of bounds

      }
    }
  }



  handleRotation()
  {
    this.clearTetromino();

    let copyPiece = new Tetromino()
    copyPiece.x = this.currentTet.x
    copyPiece.y = this.currentTet.y
    copyPiece.matrix = this.currentTet.matrix
    copyPiece.orientation = this.currentTet.orientation

    //console.log(copyPiece.matrix.join('\n'));

    copyPiece.rotate()

    //console.log(copyPiece.matrix.join('\n'));

    if (this.validMove(copyPiece))  {console.log('this is valid');this.currentTet.rotate()}


    this.redrawPiece()
  }


  checkBottom()
  {
    const n = this.currentTet.matrix.length
    for (let i = 0;i < n;i++)
    {
      
    }
  }

  spawnTetromino()
  {
    let tet2 = new TetrominoL()
    this.currentTet = tet2
    this.insertTetromino()
    this.renderGameBoard()
  }

  makeMove(direction)
  {
    this.clearTetromino()
    let copyPiece = new Tetromino()
    copyPiece.x = this.currentTet.x
    copyPiece.y = this.currentTet.y
    copyPiece.matrix = this.currentTet.matrix


    switch(direction) {
      case KEY.DOWN:
        copyPiece.moveDown()
        if (this.validMove(copyPiece))
        {
          this.checkBottom()
          this.currentTet.moveDown()
        }
        else
        {
            this.checkRows()
            this.spawnTetromino()
        }
        break;
      case KEY.RIGHT:
        copyPiece.moveRight()
        if (this.validMove(copyPiece))  this.currentTet.moveRight()
        break;
      case KEY.LEFT:
        copyPiece.moveLeft()
        if (this.validMove(copyPiece))  this.currentTet.moveLeft()
        break;
    }




    this.redrawPiece()
  }




  keyDown(ev) {
      switch(ev.keyCode) {
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

  run()
  {


    this.currentTet = new TetrominoJ()

    this.insertTetromino()
     this.renderGameBoard()






  }

}




