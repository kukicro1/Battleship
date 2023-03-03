import { Dom } from '../dom/dom'
import { DeployHumanShips } from './DeployHumanShips'
import { Gameboard } from './gameboard'
import { Player } from './player'
import { Ships } from './shipObjects'

export const GameLoop = async () => {
  const humanBoard = Gameboard()
  const computerBoard = Gameboard()

  const human = Player('Human', computerBoard)
  const computer = Player('Computer', humanBoard)

  let humanShips = [...Ships.humanShips]
  let computerShips = [...Ships.computerShips]

  // Add logic to set x and y coordinates with dom by drag and drop, or by click
  // Add promise DeployHumanShips?
  // await DeployHumanShips(humanShips, humanBoard)

  humanBoard.deployShip(0, 0, 'horizontal', humanShips.shift())
  humanBoard.deployShip(0, 4, 'horizontal', humanShips.shift())
  humanBoard.deployShip(1, 1, 'horizontal', humanShips.shift())
  humanBoard.deployShip(3, 5, 'horizontal', humanShips.shift())
  humanBoard.deployShip(9, 0, 'horizontal', humanShips.shift())

  console.log(humanBoard.grid)
  Dom.showHumanShips(humanBoard.grid)
  computerBoard.deployComputerFleet(computerShips)

  while (!humanBoard.allShipsSunk() && !computerBoard.allShipsSunk()) {
    if (human.currentTurn()) {
      human.changeTurn()
      computer.changeTurn()
      let [row, col] = await Dom.showHitOnComputerGrid(computerBoard.grid)
      human.attack(row, col)
      if (computer.currentTurn() === false) computer.changeTurn()
      if (computerBoard.allShipsSunk()) {
        Dom.humanWon()
        break
      }
    } else if (computer.currentTurn()) {
      computer.changeTurn()
      human.changeTurn()
      computer.attack()
      Dom.showHitOnHumanGrid(humanBoard.grid)
      if (humanBoard.allShipsSunk()) {
        Dom.computerWon()
        break
      }
    }
  }

  Ships.resetShips()
  humanBoard.reset()
  computerBoard.reset()

  return {
    humanBoard,
    computerBoard,
    human,
    computer,
  }
}
