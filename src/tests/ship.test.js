/*global test, expect, describe*/
/*eslint no-undef: "error"*/

import { Ship } from '../js/ship'

describe('Ship object', () => {
  test('Is ship object with properties length, shipID, hit and sunk?', () => {
    expect(Ship(2, 'destroyer')).toEqual({
      length: 2,
      shipID: 'destroyer',
      hit: expect.any(Function),
      isSunk: expect.any(Function),
    })
  })

  test('How many times is ship being hit?', () => {
    const ship = Ship(3)
    ship.hit()
    expect(ship.isSunk()).toBe(false)
    ship.hit()
    expect(ship.isSunk()).toBe(false)
    ship.hit()
    expect(ship.isSunk()).toBe(true)
  })
})
