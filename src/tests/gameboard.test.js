/*global test, expect, describe, beforeEach*/
/*eslint no-undef: "error"*/
import { Gameboard } from '../js/gameboard'

describe('Gameboard object', () => {
  let newGame

  beforeEach(() => {
    newGame = Gameboard()
  })

  test('Is grid okay?', () => {
    newGame.createGrid()
    expect(newGame.grid.length).toBe(10)
    expect(newGame.grid[1].length).toBe(10)
  })

  // test('Is ship deployed to exact position?', () => {
  //   newGame.createGrid()
  //   newGame.deployShip(0, 1, 'vertical')
  //   expect(newGame.gridArray[1][0]).toEqual(2)
  //   expect(newGame.gridArray[1]).toEqual()
  //   expect(newGame.gridArray[1]).toEqual()
  //   expect(newGame.gridArray[1]).toEqual()
  //   expect(newGame.gridArray[1]).toEqual()
  // })
  test('Is only one ship in the field?', () => {})
  //   test('Ship coordinates test on gameboard', () => {
  //     expect().toBe()
  //   })
})
