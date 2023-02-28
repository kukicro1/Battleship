export const Player = (name, gameboard) => {
  const isComputer = name === 'Computer'
  let turn = true

  function currentTurn() {
    return turn
  }

  function changeTurn() {
    turn = !turn
  }

  function attack(x, y) {
    if (isComputer) {
      x = Math.floor(Math.random() * 10)
      y = Math.floor(Math.random() * 10)
    }
    let isLegal = isValidAttack(x, y)
    if (!isLegal) {
      return attack()
    } else return gameboard.receiveAttack(x, y)
  }

  function isValidAttack(x, y) {
    let field = gameboard.grid[x][y]
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
