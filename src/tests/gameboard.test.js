/*global test, expect, describe, beforeEach*/
/*eslint no-undef: "error"*/
import { Gameboard } from '../js/gameboard'
import { Ship } from '../js/ship'

describe('Gameboard object', () => {
  let newGame
  let ship
  let ship1
  let ship2

  beforeEach(() => {
    newGame = Gameboard()
    ship = Ship(2, '2')
    ship1 = Ship(2, '2')
    ship2 = Ship(2, '2')
  })

  test('Is grid 10x10?', () => {
    expect(newGame.grid.length).toBe(10)
    expect(newGame.grid[9].length).toBe(10)
  })

  test('Is ship deployed to exact position?', () => {
    newGame.deployShip(1, 0, 'vertical', ship)
    expect(newGame.grid[1][0].ship).toBe(ship)
    expect(newGame.grid[1][1].ship).toBe(ship)
  })

  test('Is there another ship at the same position?', () => {
    newGame.deployShip(1, 0, 'vertical', ship1)
    expect(newGame.deployShip(1, 0, 'vertical', ship2)).toMatch(
      'There is already a ship at this position'
    )
  })

  test('Does ship fit on the board?', () => {
    expect(newGame.deployShip(9, 0, 'horizontal', ship)).toMatch(
      'Ship is out of border'
    )
  })

  test('Is ship hit or missed?', () => {
    newGame.deployShip(1, 0, 'vertical', ship)
    newGame.receiveAttack(1, 1)
    expect(newGame.grid[1][0].isHit).toBe(false)
    expect(newGame.grid[1][1].isHit).toBe(true)
  })

  test('Is ship sunk?', () => {
    newGame.deployShip(1, 0, 'vertical', ship)
    newGame.receiveAttack(1, 0, ship)
    expect(ship.isSunk()).toBe(false)
    newGame.receiveAttack(1, 1, ship)
    expect(ship.isSunk()).toBe(true)
  })

  test('Are all ships sunk?', () => {
    newGame.deployShip(1, 0, 'vertical', ship1)
    newGame.deployShip(4, 4, 'vertical', ship2)
    newGame.receiveAttack(1, 0)
    newGame.receiveAttack(1, 1)
    expect(ship1.isSunk()).toBe(true)
    expect(newGame.allShipsSunk()).toBe(false)
    newGame.receiveAttack(4, 4)
    newGame.receiveAttack(4, 5)
    expect(ship2.isSunk()).toBe(true)
    expect(newGame.allShipsSunk()).toBe(true)
  })
})
