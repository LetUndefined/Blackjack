/* Het begin van blackjack. 
Write down the basics of the project */

//Function that randomly chooses a card (cards will be added later)

let cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const cardValues = {
  J: 10,
  Q: 10,
  K: 10,
  A: 11,
};
let dealer = [];
let player = [];
let totalPlayerCards = 0;
let totalDealerCards = 0;

// function generated 4 different cards, 2 for the player, 2 for the dealer. cards will be pushed to the
// designated area
function generateCards() {
  let counter = 0;

  for (let i = 0; i < 4; i++) {
    generateNumber = Math.floor(Math.random() * 13);

    randomCard = cards[generateNumber];

    counter++;
    if (counter % 2 === 0) {
      dealer.push(randomCard);
    } else {
      player.push(randomCard);
    }
  }

  updateCards();
  totalCards();
  if (playerValue === 21) {
    holdCards();
  }
  hitCard.disabled = false;
  holdCard.disabled = false;
  dealerCard.innerText = dealer[0];
}

//pushing the cards to the correct label
function updateCards() {
  playerCard.innerText = player;
  if (
    holdCard.addEventListener("click", () => {
      dealerCard.innerText = dealer;
    })
  ) {
  }
}

//adding the total of the cards to a counter
let playerValue = 0;
let dealerValue = 0;

function totalCards() {
  for (let i = 0; i < player.length; i++) {
    if (player[i] == "A" && playerValue > 10) {
      playerValue -= 10;
    }
    if (player[i] in cardValues) {
      playerValue += cardValues[player[i]];
    } else {
      playerValue += player[i];
    }
  }
  for (let j = 0; j < dealer.length; j++) {
    if (dealer[j] == "A" && dealerValue > 10) {
      dealerValue -= 10;
    }
    if (dealer[j] in cardValues) {
      dealerValue += cardValues[dealer[j]];
    } else {
      dealerValue += dealer[j];
    }
  }

  totalPlayer.innerText = playerValue;
  totalDealer.innerText = dealer[0];
}

/* functie voor het aanvragen van een extra kaart of het holden
van de huidige kaarten */

function hitCards() {
  generateNumber = Math.floor(Math.random() * 13);
  randomCard = cards[generateNumber];
  player.push(randomCard);

  if (randomCard == "A" && playerValue > 10) {
    playerValue -= 10;
  }
  if (randomCard in cardValues) {
    playerValue += cardValues[randomCard];
  } else {
    playerValue += randomCard;
  }
  updateCards();
  gameOver();

  // if (playerValue === 21) {
  //   holdCards();
  // }

  totalPlayer.innerText = playerValue;
}

//create a delay on card generation for the dealer!
function holdCards() {
  hitCard.disabled = true;
  totalDealer.innerText = dealerValue;

  const dealerInterval = setInterval(() => {
    // function: dealer must always hit below 17.
    if (dealerValue < 17) {
      generateNumber = Math.floor(Math.random() * 13);
      randomCard = cards[generateNumber];
      dealer.push(randomCard);
      dealerCard.innerText = dealer;

      if (randomCard == "A" && dealerValue > 10) {
        dealerValue -= 10;
      }
      if (randomCard in cardValues) {
        dealerValue += cardValues[randomCard];
      } else {
        dealerValue += randomCard;
      }

      updateCards();
      totalDealer.innerText = dealerValue;
    } else {
      gameOver();
    }
    if (dealerValue >= 17) {
      hitCard.disabled = true;
      resetGame.disabled = false;
      holdCard.disabled = true;
      roundWinner();

      clearInterval(dealerInterval);
    }
  }, 1000);
}

//add game over, if the player hits above 21 the game ends.
function gameOver() {
  if (playerValue > 21 || dealerValue > 21) {
    hitCard.disabled = true;
    resetGame.disabled = false;
    holdCard.disabled = true;
    totalDealer.innerText = dealerValue;
    dealerCard.innerText = dealer;
  }
}

function roundWinner() {
  if ((playerValue > dealerValue && playerValue <= 21) || dealerValue > 21) {
    winner.style.display = "block";
    winner.innerText = "You Win!";
  } else if (
    (dealerValue > playerValue && dealerValue <= 21) ||
    playerValue > 21
  ) {
    winner.style.display = "block";
    winner.innerText = "Dealer Wins!";
  }
}

// write manual game reset that appears when gameOver is triggered.
function manualReset() {
  totalPlayer.innerText = 0;
  totalDealer.innerText = 0;
  playerCard.innerText = 0;
  dealerCard.innerText = 0;
  player = [];
  dealer = [];
  playerValue = 0;
  dealerValue = 0;
  dealCards.disabled = false;
  holdCard.disabled = true;
  hitCard.disabled = true;
  winner.style.display = "none";
}

function updateLabels() {
  const buttonTypeHit = document.getElementById("hit-card");
  const labelTypePlayer = document.getElementById("total-player-cards");
  const buttonTypeHold = document.getElementById("hold-card");
  const labelTypeDealer = document.getElementById("total-dealer-cards");

  if (buttonTypeHit.disabled == false) {
    labelTypePlayer.style.background = "RGB(50, 205, 50)";
  } else if (
    buttonTypeHit.disabled == true &&
    buttonTypeHold.disabled == false
  ) {
    labelTypePlayer.style.background = "white";
    labelTypeDealer.style.background = "RGB(50, 205, 50)";
  } else {
    labelTypePlayer.style.background = "white";
    labelTypeDealer.style.background = "white";
  }
}
//getElements

const dealCards = document.getElementById("deal-cards");
const playerCard = document.getElementById("card1");
const dealerCard = document.getElementById("card2");
const totalDealer = document.getElementById("total-dealer-cards");
const totalPlayer = document.getElementById("total-player-cards");
const hitCard = document.getElementById("hit-card");
const resetGame = document.getElementById("game-reset");
const holdCard = document.getElementById("hold-card");
const winner = document.getElementById("winner");

totalPlayer.innerText = 0;
totalDealer.innerText = 0;
winner.style.display = "none";

//eventlisteners

dealCards.addEventListener("click", () => {
  generateCards();
  dealCards.disabled = true;
  resetGame.disabled = true;

  updateLabels();
});

hitCard.addEventListener("click", () => {
  hitCards();
  gameOver();
  updateLabels();
});

resetGame.addEventListener("click", () => {
  manualReset();
  updateLabels();
});
holdCard.addEventListener("click", () => {
  holdCards();
  updateLabels();
});

manualReset();
