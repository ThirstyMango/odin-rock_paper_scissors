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
  const HELLO_MESSAGE =
    "Welcome player! \n You have been chosen to play a well know game, Rock, Paper, Scissors against our fellow champion. \n What is your choice?";
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
}

function getComputerChoice() {
  // Choosing a random valid option from the array.
  const OPTIONS = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  const computerChoice = OPTIONS[randomIndex];
  return computerChoice;
}
