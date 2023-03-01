import { Ship } from './ship'

export const Ships = (() => {
  let humanShips = [
    Ship(2, '2'),
    Ship(3, '3'),
    Ship(3, '3'),
    Ship(4, '4'),
    Ship(5, '5'),
  ]

  let computerShips = [
    Ship(2, '2'),
    Ship(3, '3'),
    Ship(3, '3'),
    Ship(4, '4'),
    Ship(5, '5'),
  ]

  function resetShips() {
    humanShips.forEach((ship) => {
      ship.resetShip()
    })
    computerShips.forEach((ship) => {
      ship.resetShip()
    })
  }

  return {
    humanShips,
    computerShips,
    resetShips,
  }
})()
