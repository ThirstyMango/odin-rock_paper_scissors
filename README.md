# odin-rock_paper_scissors

First project of many it the TOP curriculum.

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
}

return { playRound };
