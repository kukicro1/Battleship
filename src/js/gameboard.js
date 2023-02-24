import { Ship } from './ship'

export const Gameboard = () => {
  let grid = []
  let shipArray = [
    Ship(5, '5'),
    Ship(4, '4'),
    Ship(3, '3'),
    Ship(3, '3'),
    Ship(2, '2'),
  ]

  function createGrid() {
    grid.from({ length: 10 }, () => {
      grid.from({ length: 10 }, () => ({
        isHit: false,
        ship: false,
        shipID: null,
      }))
    })
    // for (let i = 0; i < 10; i++) {
    //   for (let j = 0; j < 10; j++) {
    //     grid.push({
    //       x: i,
    //       y: j,
    //       hit: false,
    //       ship: false,
    //       shipID: null,
    //     })
    //   }
    // }
    // return grid
  }

  //   function deployAllShips () {
  //     while (shipArray.length > 0) {
  //       ship = shipArray.shift()
  //       deployShip(x,y,orientation, ship)
  //     }
  //   }

  function deployShip(x, y, orientation, ship = shipArray.shift()) {
    if (orientation === 'horizontal') {
      if (x + ship.length > 10) {
        return deployShip(x - 1, y, orientation, ship)
      }
    } else if (orientation === 'vertical') {
      if (y + ship.length > 10) {
        return deployShip(x, y - 1, orientation, ship)
      }
    }

    for (let i = 0; i < grid.length; i++) {
      if (grid[i].x === x && grid[i].y === y) {
        if (orientation === 'vertical') {
          for (let j = 0; j < ship.length; j++) {
            let v = grid[i].y
            v = v + j
            grid.forEach((field) => {
              if (field.x === x && field.y === v) {
                field.ship = true
                field.shipID = ship.shipID
              }
            })
          }
        } else if (orientation === 'horizontal') {
          for (let j = 0; j < ship.length; j++) {
            let h = grid[i].x
            h = h + j
            grid.forEach((field) => {
              if (field.x === h && field.y === y) {
                field.ship = true
                field.shipID = ship.shipID
              }
            })
          }
        }
      }
    }
    return grid
  }

  function receiveAttack() {}

  function missedAttacks() {}

  function whoWon() {}

  return {
    grid,
    deployShip,
    createGrid,
    receiveAttack,
  }
}
