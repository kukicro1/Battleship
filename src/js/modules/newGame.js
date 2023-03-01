import { GameLoop } from './gameLoop'

export const NewGame = (() => {
  const humanGrid = document.querySelectorAll('.humanCell')
  const computerGrid = document.querySelectorAll('.computerCell')
  const modalContainer = document.querySelector('.modalContainer')
  const restartButton = document.querySelector('.restart')

  function restartGame() {
    restartButton.addEventListener('click', () => {
      humanGrid.forEach((cell) => {
        cell.classList = 'humanCell'
      })
      computerGrid.forEach((cell) => {
        cell.classList = 'computerCell'
      })
      modalContainer.classList.add('hide')
      GameLoop()
    })
  }
  return {
    restartGame,
  }
})()
