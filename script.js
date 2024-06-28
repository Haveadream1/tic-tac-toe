// choice opponent and run func with x = 1 or x = 2
// push the game into a array of object to get history
// add bot player
const selectValue = (() => {
  let firstSection = document.querySelector(".first-section");
  let secondSection = document.querySelector(".second-section");
  let buttonPlayer = document.querySelector(".button-player");
  let buttonBot = document.querySelector(".button-bot");
  let alertContainer = document.querySelector(".alert-container");
  let alignButton = document.querySelector(".align-button");
  let winner = document.querySelector(".display-winner");
  let crossButton = document.querySelector(".cross-button");
  let gridCell = document.querySelectorAll(".grid-cell");
  let roundButton = document.querySelector(".round-button");
  let score = document.querySelector(".score");
  let buttonRestart = document.querySelector(".restart-button");
  let buttonQuit = document.querySelector(".quit-button");
  let clickCount = -1;
  let xScore = 0;
  let oScore = 0;

  /*Test */
  const title = document.querySelector('h1');
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const startButton = document.querySelector('.start-button');

  const createScore = () => {
    let score = document.createElement('p');
    score.textContent = '0 - 0';
    score.classList.add('score');
    header.appendChild(score);
  }

  const createGrid = () => {
    let gridContainer = document.createElement('section');
    gridContainer.classList.add('grid-container');

    let scoreSection = document.createElement('section');
    scoreSection.classList.add('score-section');
    gridContainer.appendChild(scoreSection);

    let xButton = document.createElement('button');
    xButton.textContent = 'X';
    xButton.classList.add('x-button');
    scoreSection.appendChild(xButton);

    let oButton = document.createElement('button');
    oButton.textContent = 'O';
    oButton.classList.add('o-button');
    scoreSection.appendChild(oButton);

    let grid = document.createElement('section');
    grid.classList.add('grid');
    gridContainer.appendChild(grid);

    for (let i = 0; i < 9; i++) {
      let gridCell = document.createElement('div');
      gridCell.classList.add('grid-cell');
      grid.appendChild(gridCell);
    }
    main.appendChild(gridContainer);
  }

  startButton.addEventListener('click', () => {
    document.querySelectorAll('.welcome-screen').forEach(e => e.remove());
    title.textContent = 'Tic Tac Toe';
    startButton.remove();
    
    createScore();
    createGrid();
  })

  // const HomeScreen = (() => {
  //   const startGame = () => {
  //     firstSection.style.visibility = "hidden";
  //     firstSection.style.gridRow = "2";
  //     secondSection.style.visibility = "visible";
  //     secondSection.style.gridRow = "1";
  //     alertContainer.style.visibility = "visible";
  //     alertContainer.style.marginTop = "150px";
  //     alignButton.style.visibility = "hidden";
  //     winner.textContent = "Select the sign to begin with";
  //   };
  //   startButton.addEventListener("click", startGame);

  //   const selectAvatar = () => {
  //     /*NEED to animate the choice, like border and movement */
  //   };
  //   buttonPlayer.addEventListener("click", selectAvatar);
  //   buttonBot.addEventListener("click", selectAvatar);
  // })();

  // const GameScreen = (() => {
  //   const regroupFunction = () => {
  //     crossButton.disabled = true;
  //     roundButton.disabled = true;
  //     alertContainer.style.visibility = "hidden";
  //   };
  //   const crossFunction = () => {
  //     array = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];
  //     regroupFunction();
  //   };
  //   crossButton.addEventListener("click", crossFunction);

  //   const roundFunction = () => {
  //     array = ["o", "x", "o", "x", "o", "x", "o", "x", "o"];
  //     regroupFunction();
  //   };
  //   roundButton.addEventListener("click", roundFunction);

  //   const selectGrid = (e) => {
  //     clickCount++;
  //     console.log(clickCount);
  //     display = array[clickCount];
  //     e.target.textContent = display;
  //     e.target.removeEventListener("click", selectGrid);
  //     setConditions();
  //   };
  //   gridCell.forEach((i) => {
  //     i.addEventListener("click", selectGrid);
  //   });

  //   // if we start with x display win when value row contains x
  //   const setConditions = () => {
  //     let cellValue1 = gridCell[0].textContent;
  //     let cellValue2 = gridCell[1].textContent;
  //     let cellValue3 = gridCell[2].textContent;
  //     let cellValue4 = gridCell[3].textContent;
  //     let cellValue5 = gridCell[4].textContent;
  //     let cellValue6 = gridCell[5].textContent;
  //     let cellValue7 = gridCell[6].textContent;
  //     let cellValue8 = gridCell[7].textContent;
  //     let cellValue9 = gridCell[8].textContent;
  //     // clean code
  //     if (
  //       (cellValue1 === "x" && cellValue2 === "x" && cellValue3 === "x") ||
  //       (cellValue4 === "x" && cellValue5 === "x" && cellValue6 === "x") ||
  //       (cellValue7 === "x" && cellValue8 === "x" && cellValue9 === "x") ||
  //       (cellValue1 === "x" && cellValue4 === "x" && cellValue7 === "x") ||
  //       (cellValue2 === "x" && cellValue5 === "x" && cellValue8 === "x") ||
  //       (cellValue3 === "x" && cellValue6 === "x" && cellValue9 === "x") ||
  //       (cellValue1 === "x" && cellValue5 === "x" && cellValue9 === "x") ||
  //       (cellValue3 === "x" && cellValue5 === "x" && cellValue7 === "x")
  //     ) {
  //       xScore++;
  //       winner.textContent = `x Win !`;
  //       stopGame();
  //     } else if (
  //       (cellValue1 === "o" && cellValue2 === "o" && cellValue3 === "o") ||
  //       (cellValue4 === "o" && cellValue5 === "o" && cellValue6 === "o") ||
  //       (cellValue7 === "o" && cellValue8 === "o" && cellValue9 === "o") ||
  //       (cellValue1 === "o" && cellValue4 === "o" && cellValue7 === "o") ||
  //       (cellValue2 === "o" && cellValue5 === "o" && cellValue8 === "o") ||
  //       (cellValue3 === "o" && cellValue6 === "o" && cellValue9 === "o") ||
  //       (cellValue1 === "o" && cellValue5 === "o" && cellValue9 === "o") ||
  //       (cellValue3 === "o" && cellValue5 === "o" && cellValue7 === "o")
  //     ) {
  //       oScore++;
  //       winner.textContent = `o Win !`;
  //       stopGame();
  //     } /*else {
  //               winner.textContent = `Tie !`;
  //               stopGame();
  //           }*/
  //   };

  //   const stopGame = () => {
  //     clickCount = 9;
  //     alertContainer.style.visibility = "visible";
  //     alertContainer.style.marginTop = "50px";
  //     alignButton.style.visibility = "visible";
  //     score.textContent = `${xScore} - ${oScore}`;
  //   };

  //   buttonQuit.addEventListener("click", () => {
  //     firstSection.style.visibility = "visible";
  //     firstSection.style.gridRow = "1";
  //     secondSection.style.visibility = "hidden";
  //     secondSection.style.gridRow = "2";
  //     crossButton.disabled = false;
  //     roundButton.disabled = false;
  //     xScore = 0;
  //     oScore = 0;
  //     score.textContent = `${xScore} - ${oScore}`;
  //     cleanGame();
  //     // clean code
  //   });

  //   const cleanGame = () => {
  //     clickCount = -1;
  //     gridCell.forEach((i) => {
  //       i.textContent = " ";
  //       i.addEventListener("click", selectGrid);
  //     });
  //     alertContainer.style.visibility = "hidden";
  //     alignButton.style.visibility = "hidden";
  //   };

  //   const restartFunction = () => {
  //     crossButton.disabled = true;
  //     roundButton.disabled = true;
  //     cleanGame();
  //   };
  //   buttonRestart.addEventListener("click", restartFunction);
  // })();
})();

// select our sign design
// sign button issue
/*
cellValue1 !== undefined && cellValue2 !== undefined && cellValue3 !== undefined &&
            cellValue4 !== undefined && cellValue5 !== undefined && cellValue6 !== undefined &&
            cellValue7 !== undefined && cellValue8 !== undefined && cellValue9 !== undefined

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
