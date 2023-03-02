export const Gameboard = () => {
  let grid = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => ({
      isHit: false,
      ship: null,
      shipID: null,
    }))
  )

  function deployComputerFleet(array) {
    while (array.length > 0) {
      let firstElement = array.shift()
      let direction = ''
      let x = Math.floor(Math.random() * 10)
      let y = Math.floor(Math.random() * 10)
      x > 4 ? (direction = 'horizontal') : (direction = 'vertical')
      while (deployShip(x, y, direction, firstElement) === false) {
        x = Math.floor(Math.random() * 10)
        y = Math.floor(Math.random() * 10)
        x > 4 ? (direction = 'horizontal') : (direction = 'vertical')
      }
    }
  }

  function deployShip(x, y, direction, ship) {
    // Check if ship fits on grid and if field is already taken by other ship
    if (direction === 'horizontal') {
      if (x + ship.length > 10) return false
      for (let i = x; i < x + ship.length; i++) {
        if (grid[i][y].ship) return false
      }
    } else if (direction === 'vertical') {
      if (y + ship.length > 10) return false
      for (let i = y; i < y + ship.length; i++) {
        if (grid[x][i].ship) return false
      }
    }
    // Place ship on the board
    if (direction === 'horizontal') {
      for (let i = x; i < x + ship.length; i++) {
        grid[i][y].ship = ship
        grid[i][y].shipID = ship.shipID
      }
    } else if (direction === 'vertical') {
      for (let i = y; i < y + ship.length; i++) {
        grid[x][i].ship = ship
        grid[x][i].shipID = ship.shipID
      }
    }
    return grid
  }

  function receiveAttack(x, y) {
    let field = grid[x][y]
    if (field.isHit === true) {
      return false
    }
    field.isHit = true
    if (field.ship) {
      field.ship.hit()
      return true
    } else return
  }

  function allShipsSunk() {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].ship && !grid[i][j].ship.isSunk()) {
          return false
        }
      }
    }
    return true
  }

  function reset() {
    grid = []
    // for (let i = 0; i < grid.length; i++) {
    //   for (let j = 0; j < grid[i].length; j++) {
    //     grid[i][j].isHit = false
    //     grid[i][j].ship = null
    //     grid[i][j].shipID = null
    //   }
    // }
  }

  return {
    grid,
    deployShip,
    receiveAttack,
    allShipsSunk,
    reset,
    deployComputerFleet,
  }
}
