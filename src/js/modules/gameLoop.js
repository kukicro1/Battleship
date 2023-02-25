import { Dom } from '../dom/dom'
import { Gameboard } from './gameboard'
import { Player } from './player'
import { Ships } from './shipObjects'

export const GameLoop = (() => {
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

  //   while (!humanBoard.allShipsSunk() || !computerBoard.allShipsSunk()) {
  //     if (human.currentTurn()) {
  //       // Needed dom to place x and y coordinates in attack function
  //       human.attack()
  //       if (computerBoard.allShipsSunk()) {
  //         // Human won!
  //         // Show winner with dom!
  //         // Restart game
  //       }
  //     } else if (computer.currentTurn()) {
  //       // Needed dom to place x and y coordinates in attack function
  //       computer.attack()
  //       if (humanBoard.allShipsSunk()) {
  //         // Computer Won!
  //         // Show winner with dom!
  //         // Restart game
  //       }
  //     }
  //   }

  // End of game, call this function again to start new game!
  return {
    humanBoard,
    computerBoard,
    human,
    computer,
  }
})()
