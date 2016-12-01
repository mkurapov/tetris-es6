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
    this.updateOrientation(true)

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
    this.updateOrientation(false)
  }

  updateOrientation(rotatingClockwise)
  {
    const orientationArray = ['u','r','d','l']
    const oldOrientation = this.orientation



    if (rotatingClockwise)
    {
      const newOrientIndex = (orientationArray.indexOf(oldOrientation)+1) % 4;
      this.orientation = orientationArray[newOrientIndex]
    }
    else
    {
      let newOrientIndex = (orientationArray.indexOf(oldOrientation)-1)  //% does not work on negative numbers
      newOrientIndex === -1 ? newOrientIndex = 3 : newOrientIndex
      this.orientation = orientationArray[newOrientIndex]
    }

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

