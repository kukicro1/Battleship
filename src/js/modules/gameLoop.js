import { Dom } from '../dom/dom'
import { DeployHumanShips } from './DeployHumanShips'
import { Gameboard } from './gameboard'
import { Player } from './player'
import { Ships } from './shipObjects'

export const GameLoop = async () => {
  await (async () => {
    const humanBoard = Gameboard()
    const computerBoard = Gameboard()

    const human = Player('Human', computerBoard)
    const computer = Player('Computer', humanBoard)

    let humanShips = [...Ships.humanShips]
    let computerShips = [...Ships.computerShips]
    await DeployHumanShips(humanShips, humanBoard)
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
  })()
}