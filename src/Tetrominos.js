export class Tetromino {

  constructor() {
    this.orientation = 'u'
    this.matrix = []
    this.x = 3
    this.y = 0
  }

  rotateClockwise()
  {
    const n = this.matrix.length
    let newArray = [
        [[],[],[]],
        [[],[],[]],
        [[],[],[]]
    ]

    for(let i = 0; i < n;i++) {
        for(let j = 0; j < n; j++) {
            newArray[i][j] = this.matrix[n - j - 1][i];
        }
    }

    this.matrix = newArray

  }

  rotateCounterClockwise()
  {
    const n = this.matrix.length
    let newArray = [
      [[],[],[]],
      [[],[],[]],
      [[],[],[]]
    ]

    for(let i = 0; i < n;i++) {
      for(let j = 0; j < n; j++) {
        newArray[i][j] = this.matrix[j][n - i - 1];
      }
    }

    this.matrix = newArray
  }
  

  


 
  

}

export class TetrominoL extends Tetromino
{
  constructor() {
    super()
    this.colour = 'B'
    this.matrix = [
        ['B',0,0],
        ['B','B','B'],
        [0,0,0]
    ]
  }
}

