export const Dom = (() => {
  const humanGrid = document.querySelectorAll('.humanCell')
  const computerGrid = document.querySelectorAll('.computerCell')
  const winningMessage = document.querySelector('.whoWonTitle')
  const modalContainer = document.querySelector('.modalContainer')

  humanGrid.forEach((cell, index) => {
    cell.dataset.index = index
  })

  computerGrid.forEach((cell, index) => {
    cell.dataset.index = index
  })

  function showHumanShips(humanBoard) {
    humanGrid.forEach((cell) => {
      let index = cell.dataset.index
      let row = Math.floor(index / 10)
      let col = index % 10
      let field = humanBoard[row][col]
      if (field.ship) {
        cell.classList.add('ship')
      }
    })
  }

  function showHitOnHumanGrid(humanBoard) {
    humanGrid.forEach((cell) => {
      let index = cell.dataset.index
      let row = Math.floor(index / 10)
      let col = index % 10
      let field = humanBoard[row][col]
      if (field.ship && field.isHit === true) {
        cell.classList.add('hit')
      } else if (!field.ship && field.isHit === true) {
        cell.classList.add('miss')
      }
    })
  }

  function showHitOnComputerGrid(computerBoard) {
    return new Promise((resolve) => {
      function handleClick(e) {
        let index = e.target.dataset.index
        let row = Math.floor(index / 10)
        let col = index % 10
        let field = computerBoard[row][col]
        if (field.ship && field.isHit === false) {
          e.target.classList.add('hit')
        } else if (!field.ship && field.isHit === false) {
          e.target.classList.add('miss')
        }
        computerGrid.forEach((cell) =>
          cell.removeEventListener('click', handleClick, { once: true })
        )
        resolve([row, col])
      }

      computerGrid.forEach((cell) =>
        cell.addEventListener('click', handleClick, { once: true })
      )
    })
  }

  function humanWon() {
    winningMessage.textContent = 'You Won!!!'
    modalContainer.classList = 'modalContainer'
  }

  function computerWon() {
    winningMessage.textContent = 'Computer Won!!!'
    modalContainer.classList = 'modalContainer'
  }

  return {
    showHumanShips,
    showHitOnHumanGrid,
    showHitOnComputerGrid,
    humanWon,
    computerWon,
  }
})()
