const header = document.querySelector('header');
const h1 = document.querySelector('h1');

const main = document.querySelector('main');
const startButton = document.querySelector('.start-button');

let array = [];
let i = -1; // as the index starts at 0

let oScore = 0;
let xScore = 0;
let clickCount = 0;

const alertSection = document.querySelector('.alert-section');
const winnerText = document.querySelector('.winner-text');

const restartButton = document.querySelector('.restart-button');
const exitButton = document.querySelector('.exit-button');

// Selector inside function as we create them with JS

document.addEventListener('DOMContentLoaded', () => {
  createHomeScreen() // Init
});

//--------------------

// need to store the gameboard as an array in the Gameboard object
// const gameBoard = {
//   array : [],

// }

const gameBoard = (function () {
  let gameBoardArray = [];
  
  const cleanArray = () => gameBoardArray = [];
  const appendElement = (e) => gameBoardArray.push(e);
  const getGameBoardArray = () => console.log(gameBoardArray);

  return {cleanArray, appendElement, getGameBoardArray};
})();

//--------------------

function xchoice() {
  const xButton = document.querySelector('.x-button');
  const oButton = document.querySelector('.o-button');
  array = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
  xButton.disabled = true;
  oButton.disabled = true;
}
function ochoice() {
  const xButton = document.querySelector('.x-button');
  const oButton = document.querySelector('.o-button');
  array = ['o', 'x', 'o', 'x', 'o', 'x', 'o', 'x', 'o'];
  xButton.disabled = true;
  oButton.disabled = true;
}

function stopGame() {
  const score = document.querySelector('.score');
  score.textContent = `${xScore} - ${oScore}`;
  alertSection.style.visibility = 'visible';
};

//Rappel user of choising x/o before gridcell => no addevent before
const winningCombinations = [
  [1,2,3] , [4,5,6] , [7,8,9], // Row
  [1,4,7] , [2,5,8] , [3,6,9], // Column
  [1,5,9] , [3,5,7]  // Diagonal
]

const checkResult = () => {
  clickCount++;

  let gridCell = document.querySelectorAll('.grid-cell');

  let cellValue1 = gridCell[0].textContent;
  let cellValue2 = gridCell[1].textContent;
  let cellValue3 = gridCell[2].textContent;
  let cellValue4 = gridCell[3].textContent;
  let cellValue5 = gridCell[4].textContent;
  let cellValue6 = gridCell[5].textContent;
  let cellValue7 = gridCell[6].textContent;
  let cellValue8 = gridCell[7].textContent;
  let cellValue9 = gridCell[8].textContent;

  if (
    (cellValue1 === "x" && cellValue2 === "x" && cellValue3 === "x") ||
    (cellValue4 === "x" && cellValue5 === "x" && cellValue6 === "x") ||
    (cellValue7 === "x" && cellValue8 === "x" && cellValue9 === "x") ||
    (cellValue1 === "x" && cellValue4 === "x" && cellValue7 === "x") ||
    (cellValue2 === "x" && cellValue5 === "x" && cellValue8 === "x") ||
    (cellValue3 === "x" && cellValue6 === "x" && cellValue9 === "x") ||
    (cellValue1 === "x" && cellValue5 === "x" && cellValue9 === "x") ||
    (cellValue3 === "x" && cellValue5 === "x" && cellValue7 === "x")
  ) {
    xScore++;
    winnerText.textContent = `x Win !`;
    stopGame();
  } else if (
    (cellValue1 === "o" && cellValue2 === "o" && cellValue3 === "o") ||
    (cellValue4 === "o" && cellValue5 === "o" && cellValue6 === "o") ||
    (cellValue7 === "o" && cellValue8 === "o" && cellValue9 === "o") ||
    (cellValue1 === "o" && cellValue4 === "o" && cellValue7 === "o") ||
    (cellValue2 === "o" && cellValue5 === "o" && cellValue8 === "o") ||
    (cellValue3 === "o" && cellValue6 === "o" && cellValue9 === "o") ||
    (cellValue1 === "o" && cellValue5 === "o" && cellValue9 === "o") ||
    (cellValue3 === "o" && cellValue5 === "o" && cellValue7 === "o")
  ) {
    oScore++;
    winnerText.textContent = `o Win !`;
    stopGame();
  } else if (clickCount === 9) {
    winnerText.textContent = `Tie !`;
    stopGame();
  }
};

function selectGridCell(e) { // Go through the array at each click
  i++;

  gameBoard.appendElement(array[i]);
  gameBoard.getGameBoardArray();

  e.target.textContent = array[i];
  e.target.removeEventListener('click', selectGridCell);
  checkResult();
}

// Main init
function createScore() {
  let score = document.createElement('p');
  score.textContent = '0 - 0';
  score.classList.add('score');
  header.appendChild(score);
}

function createGrid() {
  let gridContainer = document.createElement('section');
  gridContainer.classList.add('grid-container');

  let choiceSection = document.createElement('section');
  choiceSection.classList.add('choice-section');
  gridContainer.appendChild(choiceSection);

  let xButton = document.createElement('button');
  xButton.textContent = 'X';
  xButton.classList.add('x-button');
  choiceSection.appendChild(xButton);
  xButton.addEventListener('click', xchoice);

  let oButton = document.createElement('button');
  oButton.textContent = 'O';
  oButton.classList.add('o-button');
  choiceSection.appendChild(oButton);
  oButton.addEventListener('click', ochoice);

  let grid = document.createElement('section');
  grid.classList.add('grid');
  gridContainer.appendChild(grid);

  for (let i = 0; i < 9; i++) {
    let gridCell = document.createElement('div');
    gridCell.classList.add('grid-cell');
    grid.appendChild(gridCell);
    gridCell.addEventListener('click', selectGridCell);
  }

  main.appendChild(gridContainer);
}

startButton.addEventListener('click', () => {
  document.querySelectorAll('.home-screen').forEach(e => e.remove());
  h1.textContent = 'Tic Tac Toe';
  startButton.style.visibility = 'hidden';

  createScore();
  createGrid();
})

restartButton.addEventListener('click', () => {
  let gridCell = document.querySelectorAll('.grid-cell');
  let xButton = document.querySelector('.x-button');
  let oButton = document.querySelector('.o-button');

  array = [];
  gameBoard.cleanArray();

  xButton.disabled = false;
  oButton.disabled = false;

  alertSection.style.visibility = 'hidden';
  clickCount = 0;
  i = -1;

  gridCell.forEach(e => e.textContent = '');
  gridCell.forEach(e => e.addEventListener('click', selectGridCell));
})

function createHomeScreen() {
  let playerSection = document.createElement('section');
  playerSection.classList.add('player-section');
  playerSection.classList.add('home-screen');

  let playerImg = document.createElement('img');
  playerSection.appendChild(playerImg);

  let playerButton = document.createElement('button');
  playerButton.classList.add('player-button');
  playerButton.textContent = 'Player 2';
  playerSection.appendChild(playerButton);

  main.appendChild(playerSection);

  let computerSection = document.createElement('section');
  computerSection.classList.add('computer-section');
  computerSection.classList.add('home-screen');

  let computerImg = document.createElement('img');
  computerSection.appendChild(computerImg);

  let computerButton = document.createElement('button');
  computerButton.classList.add('computer-button');
  computerButton.textContent = 'Bot';
  computerSection.appendChild(computerButton);
  
  main.appendChild(computerSection);
}

exitButton.addEventListener('click', () => {
  let score = document.querySelector('.score');
  let gridContainer = document.querySelector('.grid-container');

  score.remove();
  gridContainer.remove();
  createHomeScreen();

  gameBoard.cleanArray();

  i = -1;
  clickCount = 0;
  oScore = 0;
  xScore = 0;

  h1.textContent = 'Select your opponent';
  alertSection.style.visibility = 'hidden';
  startButton.style.visibility = 'visible';
})

/*  First select opponent
    if player choice run function 
    if bot choice run other function
    Start button 'take us' to the game

    need to first select the X or O with what we want to play with
    return choice and start with it
    after that display 1 on 2 the choice

    the bot || player win if horizontal || vertical fill with choice or !choice
    if the div are all clicked and no winner === draw

    Display result, propose quit && rematch
*/