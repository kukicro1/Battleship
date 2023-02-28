export const Dom = (() => {
  const humanGrid = document.querySelectorAll('.humanCell')
  const computerGrid = document.querySelectorAll('.computerCell')

  humanGrid.forEach((cell, index) => {
    cell.dataset.index = index
  })

  computerGrid.forEach((cell, index) => {
    cell.dataset.index = index
  })

  function showHumanShips(humanBoard) {
    humanGrid.forEach((cell) => {
      let index = cell.dataset.index
      let x = index % 10
      let y = Math.floor(index / 10)
      let field = humanBoard[x][y]
      if (field.ship) {
        cell.classList.add('ship')
      }
    })
  }

  function showHitOnHumanGrid(humanBoard) {
    humanGrid.forEach((cell) => {
      let index = cell.dataset.index
      let x = index % 10
      let y = Math.floor(index / 10)
      let field = humanBoard[x][y]
      if (field.ship && field.isHit === false) {
        cell.classList.add('hit')
      } else if (!field.ship && field.isHit === false) {
        cell.classList.add('miss')
      }
    })
  }

  function showHitOnComputerGrid(computerBoard) {
    let x = null
    let y = null
    function handleClick(e) {
      let index = e.target.dataset.index
      x = index % 10
      y = Math.floor(index / 10)
      let field = computerBoard[x][y]
      if (field.ship && field.isHit === false) {
        e.target.classList.add('hit')
      } else if (!field.ship && field.isHit === false) {
        e.target.classList.add('miss')
      }
      computerGrid.forEach((cell) =>
        cell.removeEventListener('click', handleClick)
      )
      console.log([x, y])
      return [x, y]
    }
    computerGrid.forEach((cell) => cell.addEventListener('click', handleClick))
  }

  function showWinner() {}
  function restartGame() {}

  return {
    showHumanShips,
    showHitOnHumanGrid,
    showHitOnComputerGrid,
  }
})()
