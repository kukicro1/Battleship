import { Ship } from '../js/ship'

test('Inital test', () => {
  expect(Ship().hit(2)).toBe(4)
})
