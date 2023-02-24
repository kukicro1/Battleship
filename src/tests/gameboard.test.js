/*global test, expect, describe, beforeEach*/
/*eslint no-undef: "error"*/
import { Gameboard } from '../js/gameboard'
import { Ship } from '../js/ship'

describe('Gameboard object', () => {
  let newGame

  beforeEach(() => {
    newGame = Gameboard()
  })

  test('Is grid 10x10?', () => {
    expect(newGame.grid.length).toBe(10)
    expect(newGame.grid[9].length).toBe(10)
  })

  test('Is ship deployed to exact position?', () => {
    const newShip = Ship(2, '2')
    newGame.deployShip(1, 0, 'vertical', newShip)
    expect(newGame.grid[1][0].shipID).toBe('2')
    expect(newGame.grid[1][1].shipID).toBe('2')
  })

  test('Is there another ship at the same position?', () => {
    const ship1 = Ship(2, '2')
    const ship2 = Ship(2, '2')
    newGame.deployShip(1, 0, 'vertical', ship1)
    expect(newGame.deployShip(1, 0, 'vertical', ship2)).toMatch(
      'There is already a ship at this position'
    )
  })

  test('Does ship fit on the board?', () => {
    const ship = Ship(2, '2')
    expect(newGame.deployShip(9, 0, 'horizontal', ship)).toMatch(
      'Ship is out of border'
    )
  })

  test('Is ship hit or missed?', () => {
    const ship = Ship(2, '2')
    newGame.deployShip(1, 0, 'vertical', ship)
    newGame.receiveAttack(1, 1, ship)
    expect(newGame.grid[1][0].isHit).toBe(false)
    expect(newGame.grid[1][1].isHit).toBe(true)
    newGame.receiveAttack(1, 1, ship)
    expect(newGame.grid[1][1].isHit).toBe(true)
  })

  test('Is ship sunk?', () => {
    const ship = Ship(2, '2')
    newGame.deployShip(1, 0, 'vertical', ship)
    newGame.receiveAttack(1, 0, ship)
    expect(ship.isSunk()).toBe(false)
    newGame.receiveAttack(1, 1, ship)
    expect(ship.isSunk()).toBe(true)
  })
})
