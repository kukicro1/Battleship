export const DeployHumanShips = async (humanShips, humanBoard) => {
  const humanGrid = document.querySelectorAll('.humanCell')
  const rotateContainer = document.querySelector('.rotateContainer')
  const rotateButton = document.querySelector('.rotate')
  let direction = 'vertical'
  rotateContainer.classList = 'rotateContainer'

  function rotate() {
    if (direction === 'horizontal') {
      direction = 'vertical'
    } else if (direction === 'vertical') {
      direction = 'horizontal'
    }
    console.log(direction)
    return direction
  }
  rotateButton.addEventListener('click', rotate)

  const currentShip = humanShips[0]
  console.log(humanShips.length)

  if (humanShips.length === 0) {
    rotateContainer.style.display = 'none'
    return new Promise((resolve) => {
      console.log('start game')
    })
  }

  function validatePlacement(ship, row, col, humanBoard) {
    // const size = ship.length
    // const lastRow = direction === 'vertical' ? row + size - 1 : row
    // const lastCol = direction === 'horizontal' ? col + size - 1 : col
    // check if the ship is within the boundaries of the gameboard
    // if (lastRow >= 10 || lastCol >= 10) {
    //   return false
    // }
    // check if the cells for the ship are already occupied by another ship
    // for (let i = row; i <= lastRow; i++) {
    //   for (let j = col; j <= lastCol; j++) {
    //     if (humanBoard.grid[i][j].ship !== null) {
    //       return false
    //     }
    //   }
    // }

    if (direction === 'horizontal') {
      if (col + ship.length > 10) return false
      for (let i = col; i < col + ship.length; i++) {
        if (humanBoard.grid[row][i].ship) {
          console.log('a')
          return false
        }
      }
    } else if (direction === 'vertical') {
      if (row + ship.length > 10) return false
      for (let i = row; i < row + ship.length; i++) {
        if (humanBoard.grid[i][col].ship) {
          console.log('a')
          return false
        }
      }
    }
    // console.log(humanBoard)
    // console.log('true?!')
    // if all checks pass, the placement is valid
    return true
  }

  function hoverHandler(e) {
    const index = e.target.dataset.index
    const row = Math.floor(index / 10)
    const col = index % 10
    const validPlacement = validatePlacement(currentShip, row, col, humanBoard)

    if (validPlacement) {
      let cells = []
      for (let i = 0; i < currentShip.length; i++) {
        if (direction === 'horizontal') {
          cells.push(
            document.querySelector(`[data-index="${row * 10 + (i + col)}"]`)
          )
        } else if (direction === 'vertical') {
          cells.push(
            document.querySelector(`[data-index="${(i + row) * 10 + col}"]`)
          )
        }
      }
      cells.forEach((cell) => {
        cell.classList.add('deployable')
      })
    } else {
      this.classList.add('undeployable')
    }
  }

  function outHandler(e) {
    const index = e.target.dataset.index
    const row = Math.floor(index / 10)
    const col = index % 10
    let cells = []

    for (let i = 0; i < currentShip.length; i++) {
      if (direction === 'horizontal') {
        cells.push(
          document.querySelector(`[data-index="${row * 10 + (i + col)}"]`)
        )
      } else if (direction === 'vertical') {
        cells.push(
          document.querySelector(`[data-index="${(i + row) * 10 + col}"]`)
        )
      }
    }
    cells.forEach((cell) => {
      cell?.classList.remove('deployable', 'undeployable')
    })
  }

  function clickHandler(e) {
    const index = e.target.dataset.index
    const row = Math.floor(index / 10)
    const col = index % 10
    const validPlacement = validatePlacement(currentShip, row, col, humanBoard)

    if (validPlacement) {
      let cells = []
      for (let i = 0; i < currentShip.length; i++) {
        if (direction === 'horizontal') {
          cells.push(
            document.querySelector(`[data-index="${row * 10 + (i + col)}"]`)
          )
        } else if (direction === 'vertical') {
          cells.push(
            document.querySelector(`[data-index="${(i + row) * 10 + col}"]`)
          )
        }
      }
      cells.forEach((cell) => {
        cell.classList.remove('deployable', 'undeployable')
        cell.classList.add('ship')
        cell.style.pointerEvents = 'none'
      })

      humanBoard.deployShip(row, col, direction, currentShip)
      humanShips.shift()

      humanGrid.forEach((cell) => {
        cell.removeEventListener('mouseover', hoverHandler)
        cell.removeEventListener('mouseout', outHandler)
        cell.removeEventListener('click', clickHandler)
        cell.classList.remove('deployable', 'undeployable')
      })
      if (humanShips.length >= 0) {
        //   console.log(humanShips.length)
        return DeployHumanShips(humanShips, humanBoard)
      }
    }
  }
  // else {
  //   console.log('undeployable')
  //   e.target.classList.add('undeployable')
  // }

  humanGrid.forEach((cell) => {
    cell.addEventListener('mouseover', hoverHandler)
    cell.addEventListener('mouseout', outHandler)
    cell.addEventListener('click', clickHandler)
  })
}
