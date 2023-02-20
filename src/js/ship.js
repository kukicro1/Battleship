export const Ship = () => {
  function hit(test) {
    return test * 2
  }

  function isSunk() {}

  return {
    hit,
    isSunk,
  }
}
