function getHumanChoice() {
  // The input has to be either rock, paper or scissors. The case does not matter.
  function validateHumanChoice(humanChoice) {
    if (humanChoice === null) {
      return false;
    }
    const humanChoiceLowerCase = humanChoice.toLowerCase();
    const VALID_INPUTS = ["rock", "paper", "scissors"];
    return VALID_INPUTS.includes(humanChoiceLowerCase);
  }

  // Promt messages
  const HELLO_MESSAGE = "What is your choice?";
  const ERROR_MESSAGE =
    "This input is not supported, please, enter either 'rock', 'paper' or 'scissors'. The case does not matter. ";
  const THREAD = "You cannot leave until you play!";

  // Ask user
  let humanChoice = prompt(HELLO_MESSAGE);

  // Repeat the promt until the input is either rock, paper or scissors.
  while (!validateHumanChoice(humanChoice)) {
    if (humanChoice === null) {
      // User tried to flee.
      humanChoice = prompt(THREAD);
    } else {
      humanChoice = prompt(ERROR_MESSAGE);
    }
  }

  return humanChoice;
} // -> "rock" | "paper" | "scissors"

function getComputerChoice() {
  // Choosing a random valid option from the array.
  const OPTIONS = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  const computerChoice = OPTIONS[randomIndex];
  return computerChoice;
} // -> "rock" | "paper" | "scissors"

function playGame() {
  const CONFIRM_MESSAGE =
    "Welcome player! \n You have been chosen to play a well know game, Rock, Paper, Scissors against our fellow champion. \n Do you want to play?";

  // If player does not want to play
  if (!confirm(CONFIRM_MESSAGE)) {
    return;
  }

  const ROUNDS = 5;
  const enoughToWin = Math.floor(ROUNDS / 2) + 1;
  let humanScore = 0;
  let computerScore = 0;

  function playRound(humanChoice, computerChoice) {
    const humanChoiceLowerCase = humanChoice.toLowerCase();
    let winner = null; // Presume tie
    let gameState = `A tie! ${humanChoice} does nothing to ${computerChoice}`; // Alert later

    // compare plays, determine winner if no tie, update his score
    switch (humanChoiceLowerCase) {
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
      const humanState = winner === "Human" ? "win" : "lose";
      const winSymbol =
        winner === "Human" ? humanChoice.toLowerCase() : computerChoice;
      const loseSymbol =
        winner === "Human" ? computerChoice : humanChoice.toLowerCase();

      gameState = `Computer played ${computerChoice}. You ${humanState}, ${winSymbol} beats ${loseSymbol}. The score is human - ${humanScore}:${computerScore} - computer.`;
    }

    alert(gameState); // Notify user of result
  } // -> null

  while (humanScore !== enoughToWin && computerScore !== enoughToWin) {
    // while no winner
    // getPlays
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();

    // And play one round
    playRound(humanChoice, computerChoice);
  }

  // Last message alerted
  if (humanScore === enoughToWin) {
    alert(`You have won ${humanScore}:${computerScore}. Congratulations!`);
    return "Human";
  }

  alert(`You have lost ${humanScore}:${computerScore}`);
  return "Computer";
} // -> str; Winner of the game

playGame();
