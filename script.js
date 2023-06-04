// choice opponent and run func with x = 1 or x = 2
// push the game into a array of object to get history 
let startButton = document.querySelector('.start-button'); 
const startGame = function() {
    let firstSection = document.querySelector('.first-section');
    firstSection.style.visibility = 'hidden'; 
    let secondSection = document.querySelector('.second-section');
    secondSection.style.visibility = 'visible';
}
startButton.addEventListener('click', startGame);

let avatarPlayer = document.querySelector('.avatar-player');
let avatarBot = document.querySelector('.avatar-bot');
const selectAvatar = function() {
    /*NEED to animate the choice, like border and movement */
}
avatarPlayer.addEventListener('click', selectAvatar);
avatarBot.addEventListener('click', selectAvatar);

let crossButton = document.querySelector('.cross-button');
crossButton.addEventListener('click', function() {
    array = ['x','o','x','o','x','o','x','o','x'];
    crossButton.disabled = true;
    roundButton.disabled = true;
})

let roundButton = document.querySelector('.round-button');
roundButton.addEventListener('click', function() {
    array = ['o','x','o','x','o','x','o','x','o'];
    crossButton.disabled = true;
    roundButton.disabled = true;
})

// need to block event listener until a button x or o is pushed
let gridCell = document.querySelectorAll('.grid-cell');
// because index start at 0
let clickCount = -1;
const selectGrid = function(e) {
    clickCount++;
    console.log(clickCount);
    let display = array[clickCount];
    e.target.textContent = display;
    // remove after one click so it can't be overwrite
    e.target.removeEventListener('click', selectGrid);
    setConditions()
}
gridCell.forEach(function(i) {
    i.addEventListener('click', selectGrid);
})

let xScore = '0';
let oScore = '0';
// if we start with x display win when value row contains x 
const setConditions = function() {
    let cellValue1 = gridCell[0].textContent;
    let cellValue2 = gridCell[1].textContent;
    let cellValue3 = gridCell[2].textContent;
    let cellValue4 = gridCell[3].textContent;
    let cellValue5 = gridCell[4].textContent;
    let cellValue6 = gridCell[5].textContent;
    let cellValue7 = gridCell[6].textContent;
    let cellValue8 = gridCell[7].textContent;
    let cellValue9 = gridCell[8].textContent;

    if( cellValue1 === 'x' && cellValue2 === 'x' && cellValue3 === 'x' ||
        cellValue4 === 'x' && cellValue5 === 'x' && cellValue6 === 'x' ||
        cellValue7 === 'x' && cellValue8 === 'x' && cellValue9 === 'x' ||
        cellValue1 === 'x' && cellValue4 === 'x' && cellValue7 === 'x' ||
        cellValue2 === 'x' && cellValue5 === 'x' && cellValue8 === 'x' ||
        cellValue3 === 'x' && cellValue6 === 'x' && cellValue9 === 'x' ||
        cellValue1 === 'x' && cellValue5 === 'x' && cellValue9 === 'x' ||
        cellValue3 === 'x' && cellValue5 === 'x' && cellValue7 === 'x'){
        console.log('X win'); 
        xScore++;
        stopGame();
        displayScore();
        
    } else if(  
        cellValue1 === 'o' && cellValue2 === 'o' && cellValue3 === 'o' ||
        cellValue4 === 'o' && cellValue5 === 'o' && cellValue6 === 'o' ||
        cellValue7 === 'o' && cellValue8 === 'o' && cellValue9 === 'o' ||
        cellValue1 === 'o' && cellValue4 === 'o' && cellValue7 === 'o' ||
        cellValue2 === 'o' && cellValue5 === 'o' && cellValue8 === 'o' ||
        cellValue3 === 'o' && cellValue6 === 'o' && cellValue9 === 'o' ||
        cellValue1 === 'o' && cellValue5 === 'o' && cellValue9 === 'o' ||
        cellValue3 === 'o' && cellValue5 === 'o' && cellValue7 === 'o'){
        console.log('O win'); 
        oScore++;
        stopGame();
        displayScore();
    }
    // need to specify a tie
}

let score = document.querySelector('.score');
const displayScore = function() {
    score.textContent = `${xScore} - ${oScore}`;
}

let alertContainer = document.querySelector('.alert-container');
const stopGame = function() {
    clickCount = 9;
    alertContainer.style.visibility= 'visible';
}

let buttonQuit = document.querySelector('.quit-button');
buttonQuit.addEventListener('click', function() {
    firstSection = document.querySelector('.first-section');
    firstSection.style.visibility = 'visible'; 
    secondSection = document.querySelector('.second-section');
    secondSection.style.visibility = 'hidden';
    alertContainer = document.querySelector('.alert-container');
    alertContainer.style.visibility= 'hidden';
    xScore = 0;
    oScore = 0;
    displayScore();
    cleanGame();
    // clean code
})

const cleanGame = function() {
    clickCount = -1;
    let allCell = document.querySelectorAll('.grid-cell');
    allCell.forEach(function(i) {
        i.textContent = ' ';
    })
    gridCell.forEach(function(i) {
        i.addEventListener('click', selectGrid);
    })
    crossButton.disabled = false;
    roundButton.disabled = false;
}

let buttonRestart = document.querySelector('.restart-button');
const test = function() {
    alertContainer = document.querySelector('.alert-container');
    alertContainer.style.visibility= 'hidden';
    cleanGame();
}
buttonRestart.addEventListener('click', test);


// select our sign design
// put all the query in global value
// why re ask for sign as we restart the party, make it only for when we leave

/*
(function() {

})();

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