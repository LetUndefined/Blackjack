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
let totalTokens = 0;
let playerValue = 0;
let dealerValue = 0;
let startBalance = 100;
// function generated 4 different cards, 2 for the player, 2 for the dealer. cards will be pushed to the
// designated area
function generateCards() {
  let counter = 0;

  for (let i = 0; i < 4; i++) {
    let generateNumber = Math.floor(Math.random() * 13);

    let randomCard = cards[generateNumber];

    counter++;
    if (counter % 2 === 0) {
      dealer.push(randomCard);
    } else {
      player.push(randomCard);
    }
  }
  dealerCard.innerText = dealer[0];

  updateCards();
  totalCards();
  if (playerValue >= 21) {
    dealerCard.innerText = dealer;

    holdCards();
  }
  hitCard.disabled = false;
  holdCard.disabled = false;
}

//pushing the cards to the correct label
function updateCards() {
  playerCard.innerText = player;
}

//adding the total of the cards to a counter

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

  if (playerValue === 21) {
    holdCards();
  }
  updateCards();
  gameOver();

  totalPlayer.innerText = playerValue;
}

//create a delay on card generation for the dealer!
function holdCards() {
  hitCard.disabled = true;
  totalDealer.innerText = dealerValue;
  dealerCard.innerText = dealer;

  const dealerInterval = setInterval(() => {
    updateCards();

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

      totalDealer.innerText = dealerValue;
    } else {
      gameOver();
    }
    if (dealerValue >= 17) {
      hitCard.disabled = true;
      holdCard.disabled = true;
      roundWinner();

      clearInterval(dealerInterval);
    }
  }, 1000);
}

//add game over, if the player hits above 21 the game ends.
function gameOver() {
  if (playerValue > 21 || dealerValue > 21) {
    roundWinner();
    hitCard.disabled = true;
    holdCard.disabled = true;
    totalDealer.innerText = dealerValue;
    dealerCard.innerText = dealer;
  }
}

function roundWinner() {
  if ((playerValue > dealerValue && playerValue <= 21) || dealerValue > 21) {
    winner.style.visibility = "visible";
    winner.innerText = "You Win!";
    winner.style.background = " rgba(95, 192, 75, 0.7)";
    updateBalance();
  } else if ((dealerValue > playerValue && dealerValue <= 21) || playerValue > 21) {
    winner.style.visibility = "visible";
    winner.innerText = "Dealer Wins!";
    updateBalance();
  } else if (playerValue === dealerValue) {
    winner.style.visibility = "visible";
    winner.innerText = "Push";
    updateBalance();
  }
  tokens.forEach((tokens) => (tokens.disabled = false));
  playerTokensContainer.style.background = "white";
  playerTokensContainer.style.color = "black";
  playerTokensContainer.style.borderColor = "black";

  if (Number(balance.innerText) === 0) {
    tokens.forEach((tokens) => (tokens.disabled = true));
  }
}

function roundRestart() {
  totalPlayer.innerText = 0;
  totalDealer.innerText = 0;
  playerCard.innerText = 0;
  dealerCard.innerText = 0;
  player = [];
  dealer = [];
  dealCards.disabled = false;
  holdCard.disabled = true;
  hitCard.disabled = true;
  winner.style.visibility = "hidden";
}

function updateLabels() {
  const buttonTypeHit = document.getElementById("hit-card");
  const labelTypePlayer = document.getElementById("total-player-cards");
  const buttonTypeHold = document.getElementById("hold-card");
  const labelTypeDealer = document.getElementById("total-dealer-cards");

  if (buttonTypeHit.disabled == false && playerValue < 21) {
    labelTypePlayer.style.background = "RGB(240, 205, 50)";
  } else if (buttonTypeHit.disabled == true && buttonTypeHold.disabled == false) {
    labelTypePlayer.style.background = "white";
    labelTypeDealer.style.background = "RGB(240, 205, 50)";
  } else {
    labelTypePlayer.style.background = "white";
    labelTypeDealer.style.background = "RGB(240, 205, 50";
  }

  for (let i = 0; i < tokens.length; i++) {
    tokens[i].addEventListener("click", () => {
      labelTypeDealer.style.background = "white";
    });
  }
}

function addToken() {
  balance.innerText = startBalance;
  let totalDeduct = 0;
  for (let i = 0; i < tokens.length; i++) {
    tokens[i].addEventListener("click", () => {
      playerTokensContainer.style.background = "rgba(93, 8, 191, 0.344)";
      playerTokensContainer.style.color = "white";
      playerTokensContainer.style.borderColor = "white";
      roundRestart();
      dealCards.disabled = false;
      if (event.target.id === "all-in") {
        totalTokens = Number(balance.innerText);
        totalDeduct = Number(balance.innerText);
      } else if (event.target.id === "token-1") {
        totalTokens += 1;
        totalDeduct = 1;
      } else if (event.target.id === "token-2") {
        totalTokens += 2;
        totalDeduct = 2;
      } else if (event.target.id === "token-5") {
        totalTokens += 5;
        totalDeduct = 5;
      } else if (event.target.id === "token-10") {
        totalTokens += 10;
        totalDeduct = 10;
      } else if (event.target.id === "token-25") {
        totalTokens += 25;
        totalDeduct = 25;
      }
      totalPlayerTokens.innerText = totalTokens;
      balance.innerText = Number(balance.innerText) - totalDeduct;
      checkBalance();
    });
  }
}

function checkBalance() {
  const balanceValue = Number(balance.innerText);
  if (balanceValue < 1) {
    tokens[0].disabled = true;
  } else if (balanceValue < 2) {
    tokens[1].disabled = true;
  } else if (balanceValue < 5) {
    tokens[2].disabled = true;
  } else if (balanceValue < 10) {
    tokens[3].disabled = true;
  } else if (balanceValue < 25) {
    tokens[4].disabled = true;
  }
  if (balanceValue === 0) {
    tokens.forEach((tokens) => (tokens.disabled = true));
  }
}

function updateBalance() {
  let oldBalance = Number(balance.innerText);
  if ((playerValue > dealerValue && playerValue <= 21) || dealerValue > 21) {
    totalTokens = totalTokens * 2;
    balance.innerText = oldBalance + totalTokens;
    totalPlayerTokens.innerText = 0;
    totalTokens = 0;
  } else if ((dealerValue > playerValue && dealerValue <= 21) || playerValue > 21) {
    totalPlayerTokens.innerText = 0;
    totalTokens = 0;
  } else {
    balance.innerText = oldBalance + totalTokens;
    totalTokens = 0;
  }
}

//getElements

const dealCards = document.getElementById("deal-cards");
const playerCard = document.getElementById("card1");
const dealerCard = document.getElementById("card2");
const totalDealer = document.getElementById("total-dealer-cards");
const totalPlayer = document.getElementById("total-player-cards");
const hitCard = document.getElementById("hit-card");
const holdCard = document.getElementById("hold-card");
const winner = document.getElementById("winner");
const totalPlayerTokens = document.getElementById("total-player-tokens");
const tokens = document.querySelectorAll("#token-1, #token-2, #token-5, #token-10, #token-25, #all-in");
const balance = document.getElementById("total-owned-tokens");
const tokenContainer = document.getElementById("playerTokensContainer");

totalPlayer.innerText = 0;
totalDealer.innerText = 0;

//eventlisteners

dealCards.addEventListener("click", () => {
  playerValue = 0;
  dealerValue = 0;

  generateCards();
  dealCards.disabled = true;
  for (let i = 0; i < tokens.length; i++) {
    tokens[i].disabled = true;
  }

  updateLabels();
});

hitCard.addEventListener("click", () => {
  hitCards();
  gameOver();
  updateLabels();
});

holdCard.addEventListener("click", () => {
  holdCards();
  updateLabels();
});

addToken();
dealCards.disabled = true;
hitCard.disabled = true;
holdCard.disabled = true;
winner.style.visibility = "hidden";
