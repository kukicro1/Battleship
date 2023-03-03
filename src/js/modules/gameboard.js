export const Gameboard = () => {
  let grid = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => ({
      isHit: false,
      ship: null,
      shipID: null,
    }))
  )


  function deployShip(row, col, direction, ship) {
    // Check if ship fits on grid and if field is already taken by other ship
    if (direction === 'horizontal') {
      if (col + ship.length > 10) return false
      for (let i = col; i < col + ship.length; i++) {
        if (grid[row][i].ship) return false
      }
    } else if (direction === 'vertical') {
      if (row + ship.length > 10) return false
      for (let i = row; i < row + ship.length; i++) {
        if (grid[i][col].ship) return false
      }
    }
    // Place ship on the board
    if (direction === 'horizontal') {
      for (let i = col; i < col + ship.length; i++) {
        grid[row][i].ship = ship
        grid[row][i].shipID = ship.shipID
      }
    } else if (direction === 'vertical') {
      for (let i = row; i < row + ship.length; i++) {
        grid[i][col].ship = ship
        grid[i][col].shipID = ship.shipID
      }
    }
    return grid
  }

  function deployComputerFleet(array) {
    while (array.length > 0) {
      let firstElement = array.shift()
      let direction = ''
      let row = Math.floor(Math.random() * 10)
      let col = Math.floor(Math.random() * 10)
      row > 4 ? (direction = 'horizontal') : (direction = 'vertical')
      while (deployShip(row, col, direction, firstElement) === false) {
        row = Math.floor(Math.random() * 10)
        col = Math.floor(Math.random() * 10)
        row > 4 ? (direction = 'horizontal') : (direction = 'vertical')
      }
    }
  }

  function receiveAttack(row, col) {
    let field = grid[row][col]
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
