const getHumanChoice = function getHumanChoice() {
  
  // Input is rock | paper | scissors. Any case accepted.
  const validateHumanChoice = function validateHumanChoice(humanChoice) {
    
    if (humanChoice === null) {
      return false;
    }
    
    const humanChoiceLowerCase = humanChoice.toLowerCase();
    const VALID_INPUTS = ['rock', 'paper', 'scissors'];
    return VALID_INPUTS.includes(humanChoiceLowerCase);
  }

  // Prompt messages
  const HELLO_MESSAGE = 'What is your choice?';
  const ERROR_MESSAGE =
    'This input is not supported, please, enter either \'rock\', \'paper\' or \'scissors\'. The case does not matter. ';
  const THREAD = 'You cannot leave until you play!';

  // Ask user
  let humanChoice = prompt(HELLO_MESSAGE);

  // Repeat the promt until the input is either rock, paper or scissors.
  while (!validateHumanChoice(humanChoice)) {
    if (humanChoice === null) { // User tried to flee.
      humanChoice = prompt(THREAD);
    } else {
      humanChoice = prompt(ERROR_MESSAGE);
    }
  }

  return humanChoice;
} // -> 'rock' | 'paper' | 'scissors'

const getComputerChoice = function getComputerChoice() {
  // Choosing a random valid option from the array.
  const OPTIONS = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  const computerChoice = OPTIONS[randomIndex];
  return computerChoice;
} // -> 'rock' | 'paper' | 'scissors'

const playGame = function playGame() {
  const CONFIRM_MESSAGE =
    'Welcome player! \n You have been chosen to play a well known game, Rock, Paper, Scissors against our fellow champion. \n Do you want to play?';

  // If player does not want to play
  if (!confirm(CONFIRM_MESSAGE)) {
    return;
  }

  const NUMBER_OF_ROUNDS = 5;
  let currentRound = 1; 
  let humanScore = 0;
  let computerScore = 0;

  const playRound = function playRound(humanChoice, computerChoice) {
    currentRound++; 
    const humanChoiceLowerCase = humanChoice.toLowerCase();
    let winner = null; // Presume tie
    let gameState = `A tie! ${humanChoice} does nothing to ${computerChoice}`;

    switch (humanChoiceLowerCase) {
      case 'rock':
        switch (computerChoice) {
          case 'paper':
            computerScore++;
            winner = 'Computer';
            break;
          case 'scissors':
            humanScore++;
            winner = 'Human';
            break;
        }
        break;
      case 'paper':
        switch (computerChoice) {
          case 'rock':
            humanScore++;
            winner = 'Human';
            break;
          case 'scissors':
            computerScore++;
            winner = 'Computer';
            break;
        }
        break;
      case 'scissors':
        switch (computerChoice) {
          case 'rock':
            computerScore++;
            winner = 'Computer';
            break;
          case 'paper':
            humanScore++;
            winner = 'Human';
            break;
        }
    }

    // If winner alerted message has to change 
    if (winner) {
      const humanState = (winner === 'Human') ? 'win' : 'lose';
      const winnerChoice =
        (winner === 'Human') ? humanChoiceLowerCase : computerChoice;
      const loserChoice =
        (winner === 'Human') ? computerChoice : humanChoiceLowerCase;

      gameState = `Computer played ${computerChoice}. You ${humanState}, ${winnerChoice} beats ${loserChoice}. The score is human - ${humanScore}:${computerScore} - computer.`;
    }

    alert(gameState); 
  } // -> null

  while (currentRound <= NUMBER_OF_ROUNDS) {
    
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();

    playRound(humanChoice, computerChoice);
  }

  let resultMessage = `A tie. The score was human - ${humanScore}:${computerScore} - computer.`
  
  if (humanScore > computerScore) {
    resultMessage = `You have won ${humanScore}:${computerScore}. Congratulations!`;
  }else if(humanScore < computerScore){
    resultMessage = `You have lost ${humanScore}:${computerScore}. Too bad!`
  };
  return alert(resultMessage)
} // -> null

playGame();
