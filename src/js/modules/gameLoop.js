import { Dom } from '../dom/dom'
import { Gameboard } from './gameboard'
import { Player } from './player'
import { Ships } from './shipObjects'

export const GameLoop = ((x, y) => {
  const humanBoard = Gameboard()
  const computerBoard = Gameboard()

  const human = Player('Human', computerBoard)
  const computer = Player('Computer', humanBoard)

  let humanShips = Ships.humanShips
  let computerShips = Ships.computerShips

  // Add logic to set x and y coordinates with dom by drag and drop, or by click
  humanBoard.deployShip(0, 0, 'horizontal', humanShips.shift())
  humanBoard.deployShip(4, 0, 'horizontal', humanShips.shift())
  humanBoard.deployShip(1, 1, 'horizontal', humanShips.shift())
  humanBoard.deployShip(5, 3, 'horizontal', humanShips.shift())
  humanBoard.deployShip(0, 9, 'horizontal', humanShips.shift())

  // Add logic for computer to set x and y by random parameter
  computerBoard.deployShip(0, 0, 'horizontal', computerShips.shift())
  computerBoard.deployShip(4, 0, 'horizontal', computerShips.shift())
  computerBoard.deployShip(1, 1, 'horizontal', computerShips.shift())
  computerBoard.deployShip(5, 3, 'horizontal', computerShips.shift())
  computerBoard.deployShip(0, 9, 'horizontal', computerShips.shift())

  Dom.showHumanShips(humanBoard.grid)

  while (!humanBoard.allShipsSunk() || !computerBoard.allShipsSunk()) {
    if (human.currentTurn()) {
      human.changeTurn()
      computer.changeTurn()
      console.log('human')
      let arr = Dom.showHitOnComputerGrid(computerBoard.grid)
      console.log(arr[0])
      console.log(arr[1])
      console.log('not human turn anymore')

      human.attack(x, y)

      if (computerBoard.allShipsSunk()) {
        // Human won!
        // Show winner with dom!
        // Restart game

        return console.log('Human won!')
      }
    } else if (computer.currentTurn()) {
      computer.changeTurn()
      human.changeTurn()
      computer.attack()
      console.log('computer')
      if (humanBoard.allShipsSunk()) {
        // Computer Won!
        // Show winner with dom!
        // Restart game

        return console.log('Computer won!')
      }
    }
  }
  console.log('end')

  // End of game, call this function again to start new game!
  return {
    humanBoard,
    computerBoard,
    human,
    computer,
  }
})()
