import { Ship } from './ship'

export const Gameboard = () => {
  const grid = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => ({
      isHit: false,
      ship: false,
      shipID: null,
    }))
  )

  let shipArray = [
    Ship(5, '5'),
    Ship(4, '4'),
    Ship(3, '3'),
    Ship(3, '3'),
    Ship(2, '2'),
  ]

  function deployShip(x, y, orientation, ship) {
    // Check if ship fits on grid and if field is already taken by other ship
    if (orientation === 'horizontal') {
      if (x + ship.length > 10) {
        return 'Ship is out of border'
      }
      for (let i = x; i < x + ship.length; i++) {
        if (grid[i][y].ship) return 'There is already a ship at this position'
      }
    } else if (orientation === 'vertical') {
      if (y + ship.length > 10) {
        return 'Ship is out of border'
      }
      for (let i = y; i < y + ship.length; i++) {
        if (grid[x][i].ship) return 'There is already a ship at this position'
      }
    }

    // Place ship on the board
    if (orientation === 'horizontal') {
      for (let i = x; i < x + ship.length; i++) {
        grid[i][y].ship = true
        grid[i][y].shipID = ship.shipID
      }
    } else if (orientation === 'vertical') {
      for (let i = y; i < y + ship.length; i++) {
        grid[x][i].ship = true
        grid[x][i].shipID = ship.shipID
      }
    }
    return grid
  }

  function receiveAttack(x, y, ship) {
    // If ship is missed
    if (grid[x][y].isHit === false && grid[x][y].ship === false) {
      grid[x][y].isHit = true
      return 'You missed'
    }
    // If ship is hit
    else if (grid[x][y].isHit === false && grid[x][y].ship === true) {
      grid[x][y].isHit = true
      ship.hit()
      return 'Boom!'
    }
    // If water or ship were already hit
    else return
  }

  function shipsSunk() {}

  return {
    grid,
    deployShip,
    receiveAttack,
  }
}