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

  return {
    length,
    shipID,
    hit,
    isSunk,
  }
}
