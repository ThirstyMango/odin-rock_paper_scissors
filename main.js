DOM = {
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

// The input has to be either rock, paper or scissors. The case does not matter.
function validateHumanChoice(humanChoice) {
  if (humanChoice === null) {
    return false;
  }
  const VALID_INPUTS = ["rock", "paper", "scissors"];
  return VALID_INPUTS.includes(humanChoice);
} // -> true | false

function showChoices(humanChoice, computerChoice) {
  // remove the last choice
  const modClasses = [
    "player-choices__block--rock",
    "player-choices__block--paper",
    "player-choices__block--scissors",
  ];
  DOM.humanChoiceBlock.classList.remove(...modClasses);
  DOM.computerChoiceBlock.classList.remove(...modClasses);

  DOM.humanChoiceBlock.classList.add(`player-choices__block--${humanChoice}`);
  DOM.humanChoiceBlock.textContent = humanChoice.toUpperCase();
  DOM.computerChoiceBlock.classList.add(
    `player-choices__block--${computerChoice}`
  );
  DOM.computerChoiceBlock.textContent = computerChoice.toUpperCase();
}

function showScore(humanScore, computerScore) {
  DOM.humanCounter.textContent = humanScore;
  DOM.computerCounter.textContent = computerScore;
}

function showRoundCount(cRound) {
  DOM.roundCounter.textContent = `Round ${cRound}.`;
}

function showRoundWinner(winner) {
  const modClasses = [
    "player-choices__block--winner",
    "player-choices__block--loser",
    "player-choices__block--neutral",
  ];
  DOM.humanChoiceBlock.classList.remove(...modClasses);
  DOM.computerChoiceBlock.classList.remove(...modClasses);

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
}

function showGameWinner(gameWinner) {
  if (!gameWinner) {
    DOM.containerInfo.textContent = "A tie.";
    return;
  }

  const modClasses = ["container--winner", "container--loser"];
  DOM.container.classList.remove(...modClasses);

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

function getComputerChoice() {
  // Choosing a random valid option from the array.
  const OPTIONS = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  const computerChoice = OPTIONS[randomIndex];
  return computerChoice;
} // -> "rock" | "paper" | "scissors"

function createGame() {
  const ROUNDS = 5;
  let humanScore = 0;
  let computerScore = 0;
  let cRound = 1;
  const enoughToWin = 5;

  DOM.board.addEventListener("click", playRound);

  function blockGame() {
    DOM.board.removeEventListener("click", playRound);
    DOM.choiceButtons.forEach((button) =>
      button.classList.add("button--disabled")
    );
    DOM.restartButton.addEventListener("click", restartGame);
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
    humanScore = 0;
    computerScore = 0;
    showScore(humanScore, computerScore);

    DOM.restartButton.removeEventListener("click", restartGame);
    DOM.restartButton.classList.add("hidden");

    const modClasses = ["container--winner", "container--loser"];
    DOM.container.classList.remove(...modClasses);

    // remove the last choice
    const modClassesButton = [
      "player-choices__block--rock",
      "player-choices__block--paper",
      "player-choices__block--scissors",
      "player-choices__block--winner",
      "player-choices__block--loser",
    ];
    DOM.humanChoiceBlock.classList.remove(...modClassesButton);
    DOM.computerChoiceBlock.classList.remove(...modClassesButton);

    DOM.humanChoiceBlock.textContent = "Human choice";
    DOM.computerChoiceBlock.textContent = "ComputerChoice";

    DOM.roundCounter.textContent = "Round 1.";

    DOM.containerInfo.textContent = "Enjoy a game against computer";
    unBlockGame();
  }

  function playRound(event) {
    const humanChoice = event.target.getAttribute("data-choice");

    if (!validateHumanChoice(humanChoice)) {
      return;
    }

    const computerChoice = getComputerChoice();
    let winner = null; // Presume tie
    let gameState = "A tie!";

    // compare plays, determine winner if no tie, update his score
    switch (humanChoice) {
      case "rock":
        switch (computerChoice) {
          case "paper":
            computerScore++;
            winner = "Computer";
            break;
          case "scissors":
            humanScore++;
            winner = "Human";
            break;
        }
        break;
      case "paper":
        switch (computerChoice) {
          case "rock":
            humanScore++;
            winner = "Human";
            break;
          case "scissors":
            computerScore++;
            winner = "Computer";
            break;
        }
        break;
      case "scissors":
        switch (computerChoice) {
          case "rock":
            computerScore++;
            winner = "Computer";
            break;
          case "paper":
            humanScore++;
            winner = "Human";
            break;
        }
    }

    // If winner, change gameState variable
    if (winner) {
      gameState = winner === "Human" ? "You win." : "You lose.";
    }

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
    showRoundCount(cRound, ROUNDS);
  } // -> null
} // -> str; Winner of the game

const game = createGame();
