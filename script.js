const header = document.querySelector('header');
const h1 = document.querySelector('h1');

const main = document.querySelector('main');
const startButton = document.querySelector('.start-button');

const alertSection = document.querySelector('.alert-section');
const winnerText = document.querySelector('.winner-text');

const restartButton = document.querySelector('.restart-button');
const exitButton = document.querySelector('.exit-button');

let array = [];
let i = -1; // as the index starts at 0

let oScore = 0;
let xScore = 0;
let clickCount = 0;

document.addEventListener('DOMContentLoaded', () => {
  createHomeScreen() // Init
});

const gameBoard = (function () {
  let gameBoardArray = ['','','','','','','','',''];

  const cleanArray = () => gameBoardArray = ['','','','','','','','',''];
  const spliceElement = (index,e) => gameBoardArray.splice(index, 1, e);
  const outputArray = () => console.log(gameBoardArray);
  const getArray = () => gameBoardArray

  return {cleanArray, spliceElement, outputArray, getArray};
})();

function stopGame() {
  const score = document.querySelector('.score');
  score.textContent = `${xScore} - ${oScore}`;
  alertSection.style.visibility = 'visible';
};

const winningComps = [
  [0,1,2] , [3,4,5] , [6,7,8], // Row
  [0,3,6] , [1,4,7] , [2,5,8], // Column
  [0,4,8] , [2,4,6]  // Diagonal
]

// Based on the winning combinations, we check if there is a winner by parcouring the array
function checkArray(choice) {
  let array = gameBoard.getArray()
  for (let i = 0; i < winningComps.length; i++) {
    if (array[winningComps[i][0]] === choice && array[winningComps[i][1]] === choice && array[winningComps[i][2]] === choice) {
      return true
    }
  }
  return false
}

// Stop the game whenever a winner is found
function checkResult() {
  clickCount++;

  if (checkArray('x')) {
    xScore++;
    winnerText.textContent = `x Win !`;

    console.log('x win');
    stopGame();
  } else if (checkArray('o')) {
    oScore++;
    winnerText.textContent = `o Win !`;

    console.log('o win');
    stopGame();
  } else if (clickCount === 9) {
    winnerText.textContent = `Tie !`;

    console.log('tie');
    stopGame();
  }
}

// Run each time a cell is clicked
function selectGridCell(e) {
  i++;

  let index = parseInt(e.target.id) // Convert the id to get the index, splice to insert at the correct index

  gameBoard.spliceElement(index, array[i]);
  gameBoard.outputArray();

  e.target.textContent = array[i];
  e.target.removeEventListener('click', selectGridCell);
  checkResult();
}

function enableEventListener() {
  let gridCell = document.querySelectorAll('.grid-cell');
  gridCell.forEach(e => e.addEventListener('click', selectGridCell));
}

function disableEventListener() {
  let gridCell = document.querySelectorAll('.grid-cell');
  gridCell.forEach(e => e.removeEventListener('click', selectGridCell))
}

function xchoice() {
  const xButton = document.querySelector('.x-button');
  const oButton = document.querySelector('.o-button');
  array = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
  xButton.disabled = true;
  oButton.disabled = true;

  enableEventListener()
}
function ochoice() {
  const xButton = document.querySelector('.x-button');
  const oButton = document.querySelector('.o-button');
  array = ['o', 'x', 'o', 'x', 'o', 'x', 'o', 'x', 'o'];
  xButton.disabled = true;
  oButton.disabled = true;

  enableEventListener()
}

// DOM handlers
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
    gridCell.id = i;
    grid.appendChild(gridCell);
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
  disableEventListener()
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