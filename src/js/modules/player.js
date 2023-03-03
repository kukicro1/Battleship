export const Player = (name, gameboard) => {
  const isComputer = name === 'Computer'
  let turn = true

  function currentTurn() {
    return turn
  }

  function changeTurn() {
    turn = !turn
  }

  function attack(row, col) {
    if (isComputer) {
      row = Math.floor(Math.random() * 10)
      col = Math.floor(Math.random() * 10)
    }
    let isLegal = isValidAttack(row, col)
    if (!isLegal) {
      return attack()
    } else return gameboard.receiveAttack(row, col)
  }

  function isValidAttack(row, col) {
    let field = gameboard.grid[row][col]
    if (field.isHit) {
      return false
    }
    return true
  }

  return {
    name,
    currentTurn,
    changeTurn,
    attack,
  }
}
