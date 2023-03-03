/*global test, expect, describe, beforeEach*/
/*eslint no-undef: "error"*/
import { Gameboard } from '../js/modules/gameboard'
import { Ship } from '../js/modules/ship'

describe('Gameboard object', () => {
  let newGame
  let ship
  let ship1
  let ship2
  let bigShip

  beforeEach(() => {
    newGame = Gameboard()
    ship = Ship(2, '2')
    ship1 = Ship(2, '2')
    ship2 = Ship(2, '2')
    bigShip = Ship(5, '5')
  })

  test('Is grid 10x10?', () => {
    expect(newGame.grid.length).toBe(10)
    expect(newGame.grid[9].length).toBe(10)
  })

  test('Is ship deployed to exact position?', () => {
    newGame.deployShip(1, 0, 'vertical', bigShip)
    expect(newGame.grid[1][0].ship).toBe(bigShip)
    expect(newGame.grid[2][0].ship).toBe(bigShip)
    expect(newGame.grid[3][0].ship).toBe(bigShip)
    expect(newGame.grid[4][0].ship).toBe(bigShip)
    expect(newGame.grid[5][0].ship).toBe(bigShip)
  })

  test('Is there another ship at the same position?', () => {
    newGame.deployShip(1, 0, 'vertical', ship1)
    expect(newGame.deployShip(1, 0, 'vertical', ship2)).toBe(false)
  })

  test('Does ship fit on the board?', () => {
    expect(newGame.deployShip(9, 0, 'vertical', ship)).toBe(false)
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
    newGame.receiveAttack(2, 0, ship)
    expect(ship.isSunk()).toBe(true)
  })

  test('Are all ships sunk?', () => {
    newGame.deployShip(1, 0, 'vertical', ship1)
    newGame.deployShip(4, 4, 'vertical', ship2)
    newGame.receiveAttack(1, 0)
    newGame.receiveAttack(2, 0)
    expect(ship1.isSunk()).toBe(true)
    expect(newGame.allShipsSunk()).toBe(false)
    newGame.receiveAttack(4, 4)
    newGame.receiveAttack(5, 4)
    expect(ship2.isSunk()).toBe(true)
    expect(newGame.allShipsSunk()).toBe(true)
  })
})
