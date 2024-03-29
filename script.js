const scoreCounter = document.querySelector(".score-counter");
const grid = document.querySelector(".grid");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainButton = document.querySelector(".play-again");

const totalCells = 100;
const totalBombs = 15;
const maxScore = totalCells - totalBombs;
const bombsList = [];

let score = 0;

function updateScore() {
  score++;
  scoreCounter.innerText = score.toString().padStart(5, "0");

  if (score === maxScore) {
    endGame(true);
  }
}

function revealAllBombs() {
  //Get all of the cells from the page
  const cells = document.querySelector(".cell");

  for (let i = 1; i <= cells.length; i++) {
    const cell = cells[i - 1];

    //if this cell is in the bombsList array, add the cell-bomb cell css class to it
    if (bombsList.includes(i)) {
      cell.classList.add("cell-bomb");
    }
  }
}

//cell = <div></div>
const cell = document.createElement("div");
cell.classList.add("cell");
//<div class="cell"></div>

for (let i = 1; i <= 100; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  //<div class="cell"></div>

  cell.addEventListener("click", function () {
    if (!cell.classList.contains("cell-clicked")) {
      updateScore();
    }

    cell.classList.add("cell-clicked");
    if (bombsList.includes(i)) {
      cell.classList.add("cell-bomb");
      endGame(false);
    }
  });

  grid.appendChild(cell);
}

while (bombsList.length < totalBombs) {
  //Generate a random number between 1 and 100, inclusive
  const randomNumber = Math.floor(Math.random() * totalCells) + 1;
  //console.log(randomNumber);

  if (!bombsList.includes(randomNumber)) {
    bombsList.push(randomNumber);
  }
}

function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = `YOU<br>WON`;
    endGameScreen.classList.add("win");
  } else {
    endGameText.innerHTML = `YOU<br>LOST`;
    endGameScreen.classList.add("lost");
    gameOver();
  }
  endGameScreen.classList.remove("hidden");
}

playAgainButton.addEventListener("click", function () {
  window.location.reload();
});

const cells = document.getElementsByClassName("cell");

function gameOver() {
  for (let j = 1; j < 100; j++) {
    if (bombsList.includes(j)) cells[j].classList.add("cell-bomb");
  }
}
