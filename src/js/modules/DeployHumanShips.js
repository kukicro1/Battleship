export const DeployHumanShips = (humanShips, humanBoard) => {
  const humanGrid = document.querySelectorAll('.humanCell')
  const rotateContainer = document.querySelector('.rotateContainer')
  const rotateButton = document.querySelector('.rotate')
  const currentShip = humanShips[0]
  let direction = 'vertical'
  rotateContainer.classList = 'rotateContainer'

  rotateButton.addEventListener('click', rotate)

  return new Promise((resolve) => {
    function clickHandler(e) {
      const index = e.target.dataset.index
      const row = Math.floor(index / 10)
      const col = index % 10
      const validPlacement = validatePlacement(
        currentShip,
        row,
        col,
        humanBoard
      )
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
        rotateButton.removeEventListener('click', rotate)

        if (humanShips.length >= 0) {
          if (humanShips.length === 0) {
            rotateContainer.classList.add('hide')
            console.log('start game')
            return resolve()
          }
          return resolve(DeployHumanShips(humanShips, humanBoard))
        }
      }
    }

    humanGrid.forEach((cell) => {
      cell.addEventListener('click', clickHandler)
      cell.addEventListener('mouseover', hoverHandler)
      cell.addEventListener('mouseout', outHandler)
    })
  })

  function rotate() {
    if (direction === 'horizontal') {
      direction = 'vertical'
    } else if (direction === 'vertical') {
      direction = 'horizontal'
    }
    console.log(direction)
    return direction
  }

  function validatePlacement(ship, row, col, humanBoard) {
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
}
