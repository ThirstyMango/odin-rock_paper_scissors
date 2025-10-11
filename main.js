// The input has to be either rock, paper or scissors. The case does not matter.
function validateHumanChoice(humanChoice) {
  if (humanChoice === null) {
    return false;
  }
  const VALID_INPUTS = ["rock", "paper", "scissors"];
  return VALID_INPUTS.includes(humanChoiceLowerCase);
} // -> true | false

function getComputerChoice() {
  // Choosing a random valid option from the array.
  const OPTIONS = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  const computerChoice = OPTIONS[randomIndex];
  return computerChoice;
} // -> "rock" | "paper" | "scissors"

function createGame() {
  const ROUNDS = 5;
  const enoughToWin = Math.floor(ROUNDS / 2) + 1;
  let humanScore = 0;
  let computerScore = 0;

  const board = document.querySelector(".form");
  board.addEventListener("click", playRound);

  function playRound(event) {
    const humanChoice = event.target.getAttribute("data-choice");

    if (!validateHumanChoice(humanChoice)) {
      throw new Error("You cannot manipulate this game!");
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

    updateScore(humanScore, computerScore);
    showGameState(gameState);
  } // -> null
} // -> str; Winner of the game

const game = createGame();
