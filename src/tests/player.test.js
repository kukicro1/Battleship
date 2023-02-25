/*global test, expect, describe, beforeEach, jest*/
/*eslint no-undef: "error"*/

import { Gameboard } from '../js/gameboard'
import { Player } from '../js/player'

describe('Player object', () => {
  let gameboard

  beforeEach(() => {
    gameboard = Gameboard()
  })

  test('Attack should call gameboard.receiveAttack', () => {
    const player = Player('Test', gameboard)
    const receiveAttack = jest.spyOn(gameboard, 'receiveAttack')
    player.attack(0, 0)
    expect(receiveAttack).toHaveBeenCalledWith(0, 0)
    expect(gameboard.grid[0][0].isHit).toBe(true)
  })

  test('If player is computer, generate random coordinates', () => {
    const computer = Player('Computer', gameboard)
    const randomSpy = jest.spyOn(Math, 'floor')
    computer.attack()
    expect(randomSpy).toHaveBeenCalledTimes(2)
  })
})
