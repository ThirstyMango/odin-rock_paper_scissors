const DOM = {
  humanChoiceBlock: document.querySelector("#human-choice"),
  computerChoiceBlock: document.querySelector("#computer-choice"),
  humanCounter: document.querySelector("#human-score"),
  computerCounter: document.querySelector("#computer-score"),
  roundCounter: document.querySelector(".container__round-count"),
  container: document.querySelector(".container"),
  containerInfo: document.querySelector(".container__info"),
  restartButton: document.querySelector(".button--restart"),
  choiceButtons: document.querySelectorAll(".button--choice"),
  board: document.querySelector(".form"),
};

const ModCls = {
  playerChoiceBG: [
    "player-choices__block--rock",
    "player-choices__block--paper",
    "player-choices__block--scissors",
  ],
  playerChoiceRES: [
    "player-choices__block--winner",
    "player-choices__block--loser",
    "player-choices__block--neutral",
  ],
  containerRES: ["container--winner", "container--loser"],
};

const WIN_MAP = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

// Input has to be either rock, paper or scissors.
// Just in case of manipulated input.
function validateHumanChoice(humanChoice) {
  if (humanChoice === null) {
    return false;
  }
  const VALID_INPUTS = ["rock", "paper", "scissors"];
  return VALID_INPUTS.includes(humanChoice);
} // -> true | false

function showChoices(humanChoice, computerChoice) {
  // remove classes from last turn
  DOM.humanChoiceBlock.classList.remove(...ModCls.playerChoiceBG);
  DOM.computerChoiceBlock.classList.remove(...ModCls.playerChoiceBG);

  // show current turn choices
  DOM.humanChoiceBlock.classList.add(`player-choices__block--${humanChoice}`);
  DOM.humanChoiceBlock.textContent = humanChoice.toUpperCase();
  DOM.computerChoiceBlock.classList.add(
    `player-choices__block--${computerChoice}`
  );
  DOM.computerChoiceBlock.textContent = computerChoice.toUpperCase();
  return;
}

function showScore(humanScore, computerScore) {
  DOM.humanCounter.textContent = humanScore;
  DOM.computerCounter.textContent = computerScore;
}

function showRoundCount(cRound) {
  DOM.roundCounter.textContent = `Round ${cRound}.`;
}

function showRoundWinner(winner) {
  DOM.humanChoiceBlock.classList.remove(...ModCls.playerChoiceRES);
  DOM.computerChoiceBlock.classList.remove(...ModCls.playerChoiceRES);

  switch (winner) {
    case "Human":
      DOM.humanChoiceBlock.classList.add("player-choices__block--winner");
      DOM.computerChoiceBlock.classList.add("player-choices__block--loser");
      break;
    case "Computer":
      DOM.humanChoiceBlock.classList.add("player-choices__block--loser");
      DOM.computerChoiceBlock.classList.add("player-choices__block--winner");
      break;
    default:
      DOM.humanChoiceBlock.classList.add("player-choices__block--neutral");
      DOM.computerChoiceBlock.classList.add("player-choices__block--neutral");
  }
  return;
}

function showGameWinner(gameWinner) {
  switch (gameWinner) {
    case "Human":
      DOM.container.classList.add("container--winner");
      DOM.containerInfo.textContent = "You have won.";
      break;
    case "Computer":
      DOM.container.classList.add("container--loser");
      DOM.containerInfo.textContent = "You have lost.";
      break;
  }

  return;
}

function showRestartButton() {
  DOM.restartButton.classList.remove("hidden");
}

const getComputerChoice = function getComputerChoice() {
  // Choosing a random valid option from the array.
  const OPTIONS = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  const computerChoice = OPTIONS[randomIndex];
  return computerChoice;
}; // -> 'rock' | 'paper' | 'scissors'

function createGame() {
  const enoughToWin = 5;
  let humanScore = 0;
  let computerScore = 0;
  let cRound = 1;

  DOM.board.addEventListener("click", playRound);
  DOM.restartButton.addEventListener("click", restartGame);

  function blockGame() {
    DOM.board.removeEventListener("click", playRound);
    DOM.choiceButtons.forEach((button) =>
      button.classList.add("button--disabled")
    );
    return;
  }

  function unBlockGame() {
    DOM.board.addEventListener("click", playRound);
    DOM.choiceButtons.forEach((button) =>
      button.classList.remove("button--disabled")
    );
    return;
  }

  function restartGame() {
    cRound = 1;
    humanScore = 0;
    computerScore = 0;
    showScore(humanScore, computerScore);

    DOM.restartButton.classList.add("hidden");

    DOM.container.classList.remove(...ModCls.containerRES);

    DOM.humanChoiceBlock.classList.remove(
      ...ModCls.playerChoiceBG,
      ...ModCls.playerChoiceRES
    );
    DOM.computerChoiceBlock.classList.remove(
      ...ModCls.playerChoiceBG,
      ...ModCls.playerChoiceRES
    );

    DOM.humanChoiceBlock.textContent = "Human choice";
    DOM.computerChoiceBlock.textContent = "Computer choice";

    DOM.roundCounter.textContent = "Round 1.";

    DOM.containerInfo.textContent = "Enjoy a game against computer";
    unBlockGame();
  }

  function determineWinner(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) return null;
    return WIN_MAP[humanChoice] === computerChoice ? "Human" : "Computer";
  }

  function playRound(event) {
    const humanChoice = event.target.getAttribute("data-choice");

    // no button was clicked
    if (!validateHumanChoice(humanChoice)) {
      return;
    }

    const computerChoice = getComputerChoice();
    let winner = determineWinner(humanChoice, computerChoice);

    if (winner === "Human") humanScore++;
    else if (winner === "Computer") computerScore++;

    // informing the user
    showScore(humanScore, computerScore);
    showChoices(humanChoice, computerChoice);
    showRoundWinner(winner);

    if (humanScore >= enoughToWin || computerScore >= enoughToWin) {
      let gameWinner = humanScore >= enoughToWin ? "Human" : "Computer";
      showGameWinner(gameWinner);
      showRestartButton();
      blockGame();
      return;
    }
    cRound++;
    showRoundCount(cRound);
  } // -> null
} // -> str; Winner of the game

createGame();
