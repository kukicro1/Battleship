import { Dom } from '../dom/dom'

export const DeployHumanShips = (humanShips, humanBoard) => {
  const humanGrid = document.querySelectorAll('.humanCell')
  const rotateContainer = document.querySelectorAll('.rotateContainer')
  const rotateButton = document.querySelectorAll('.rotate')
  let direction = 'horizontal'
  rotateContainer.classList = 'rotateContainer'

  function rotate(direction) {
    rotateButton.addEventListener('click', () => {
      direction === 'horizontal'
        ? (direction = 'vertical')
        : (direction = 'horizontal')
      console.log(direction)
      return direction
    })
  }

  rotateContainer.classList = 'rotateContainer'
  return new Promise((resolve) => {
    while (humanShips.length > 0) {
      let ship = humanShips.shift()

      humanGrid.forEach((cell) => {
        cell.addEventListener('mouseover', function onMouseOver() {
          let index = cell.dataset.index
          let x = Math.floor(index / 10)
          let y = index % 10
          // Set background to red if not deployable
          if (direction === 'horizontal') {
            let currentCellIndex = index
            if (x + ship.length > 10) {
              cell.style.backgroundColor = 'rgb(255, 120, 120)'
              cell.style.cursor = 'not-allowed'
            }
            for (let i = x; i < x + ship.length; i++) {
              let currentCell = document.querySelector(
                `[data-index="${currentCellIndex}"]`
              )
              currentCellIndex = i * 10 + y
              if (currentCell.classList.contains('ship')) {
                currentCell.style.cursor = 'not-allowed'
              }
            }
          }
          if (direction === 'vertical') {
            let currentCellIndex = index
            if (y + ship.length > 10) {
              cell.style.backgroundColor = 'rgb(255, 120, 120)'
              cell.style.cursor = 'not-allowed'
            }
            for (let i = y; i < y + ship.length; i++) {
              let currentCell = document.querySelector(
                `[data-index="${currentCellIndex}"]`
              )
              currentCellIndex = x * 10 + i
              if (currentCell.classList.contains('ship')) {
                currentCell.style.cursor = 'not-allowed'
              }
            }
          }
          // Set background to green if deployable
          if (direction === 'horizontal') {
            let currentCellIndex = x * 10 + y
            cell.addEventListener('click', function onClick() {
              humanBoard.deployShip(x, y, direction, ship)
              cell.removeEventListener('click', onClick)
              cell.removeEventListener('mouseover', onMouseOver)
            })
            for (let i = x; i < x + ship.length; i++) {
              let currentCell = document.querySelector(
                `[data-index="${currentCellIndex}"]`
              )
              currentCellIndex = i * 10 + y
              currentCell.style.backgroundColor = 'rgb(140, 255, 140)'
            }
          } else if (direction === 'vertical') {
            let currentCellIndex = x * 10 + y
            cell.addEventListener('click', function onClick() {
              humanBoard.deployShip(x, y, direction, ship)
              cell.removeEventListener('click', onClick)
              cell.removeEventListener('mouseover', onMouseOver)
            })
            for (let i = y; i < y + ship.length; i++) {
              let currentCell = document.querySelector(
                `[data-index="${currentCellIndex}"]`
              )
              currentCellIndex = x * 10 + i
              currentCell.style.backgroundColor = 'rgb(140, 255, 140)'
            }
          }
        })
      })
      Dom.showHumanShips(humanBoard.grid)
      console.log(humanShips)
    }
    rotateContainer.classList.add('hide')
  })
}

// Deploy ships while humanShips array length is > 0
// On hover change background color to green for as many div's as long is the ship in given direction
// If it is not possible to deploy ship set background for that div to red, set that field as not clickable
// On click set ship on humanGrid on green fields and humanBoard.deployShip()
// After last ship is deployed to humanGrid exit while loop
// Remove rotate and start the game

// Question is:
// 1) should DeployHumanShips be put as promise to GameLoop
// 2) should GameLoop be added to DeployHumanShips
