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

  renderGameBoard()
  {
    const rand = this.getRandomInt(0, this.columns);
    console.log(rand);
    this.gameBoard[0][rand] = 'B'


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


  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  run()
  {

  this.renderGameBoard()
  }

}

