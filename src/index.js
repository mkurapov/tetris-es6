import {TetrominoL} from 'Tetrominos'

export default class Tetris {

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.scaleFactor = 32
    this.rows = 20
    this.columns = 10
    this.gameBoard = []; //make 10*20 game board
    for (let i = 0; i < this.rows; i++)
    {
      const rowsTemp = Array(this.columns).fill('E')
      this.gameBoard.push(rowsTemp)
    }

  }
  drawRect(x,y, colour) {
    const scaledX = x * this.scaleFactor
    const scaledY = y * this.scaleFactor
    this.ctx.fillStyle = colour || 'pink'
    this.ctx.fillRect(scaledX,scaledY, this.scaleFactor, this.scaleFactor);

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth   = 0.5;
    this.ctx.strokeRect(scaledX,scaledY, this.scaleFactor, this.scaleFactor);
  }

  insertTetromino(tetromino)
  {
    const xOffset = tetromino.x
    const yOffset = tetromino.y

    for (let i = 0;i < 3;i++)
    {
      for (let j = 0; j < 3; j++)
      {
        this.gameBoard[xOffset + i][yOffset + j] = tetromino.matrix[i][j]
      }
    }
  }

  renderGameBoard()
  {

    const coloursMap = {
      'E':'pink',
      'B':'#8CA4D4',
      'O':'#FDCDA7',
      'P':'#C2A1DA',
      'R':'#EF8B8B',
      'Y':'#FAF1A2',
      'C':'#D6E9F8'
    };

    for (let i = 0; i < this.rows; i++)
    {
      for (let j = 0; j < this.columns; j++)
      {
        const colourOfBlock = coloursMap[this.gameBoard[i][j]]
        this.drawRect(j, i, colourOfBlock)
      }
    }
  }

  gameLoop(period, endTime, counter)
  {





  }

  run()
  {
    this.renderGameBoard()
    let tetL = new TetrominoL()

    this.insertTetromino(tetL)
    this.renderGameBoard()

    tetL.rotateClockwise()
    this.insertTetromino(tetL)
    this.renderGameBoard()

    sleep(3000)

    tetL.rotateClockwise()
    this.insertTetromino(tetL)
    this.renderGameBoard()






  }

}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

