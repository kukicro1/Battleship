import { GameLoop } from '../modules/gameLoop'

export const Dom = () => {
  let humanGrid = GameLoop.humanBoard
  let computerGrid = GameLoop.computerBoard

  // Show ships on humans board
  // Div grid must show properties of board grid!
  function showHumanShips() {
    humanGrid.array.forEach((element) => {})
  }
  // Show every hit or miss on both boards
  function showHit() {}
  function showMiss() {}
  // After game over show who won and restart the game
  function showWinner() {}
  function restartGame() {}

  return {}
}
