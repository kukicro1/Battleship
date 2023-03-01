export const Ship = (length, shipID) => {
  let hits = 0
  let sunk = false

  function hit() {
    hits++
    isSunk(hits)
  }

  function isSunk(hits) {
    if (length === hits) sunk = true
    return sunk
  }

  function resetShip() {
    hits = 0
    sunk = false
  }

  return {
    length,
    shipID,
    hit,
    isSunk,
    resetShip,
  }
}
