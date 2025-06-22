const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function getCardFilename(value, suit) {
  const faceMap = { "A": "ace", "J": "jack", "Q": "queen", "K": "king" };
  const val = faceMap[value] || value;
  return `${val.toLowerCase()}_of_${suit.toLowerCase()}.png`;
}

function getRandomCard() {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  return { suit, value };
}

const refCardsContainer = document.getElementById("refCards");
const cardGrid = document.getElementById("cardGrid");
const resultText = document.getElementById("result");
const greetingText = document.getElementById("greeting");
const loserText = document.getElementById("loser");

let referenceCards = [];
let gridCards = [];
let matched = 0;
let guessCount = 0;
const maxGuesses = 5;

function createCardElement(card, index, isGrid = false) {
  const div = document.createElement("div");
  div.className = "card";

  const frontImg = document.createElement("img");
  frontImg.className = "front";
  frontImg.src = `./public/${getCardFilename(card.value, card.suit)}`;

  const backImg = document.createElement("img");
  backImg.className = "back";
  backImg.src = "./public/back@2x.png";

  div.appendChild(frontImg);
  div.appendChild(backImg);

  if (isGrid) {
    div.dataset.index = index;
    div.addEventListener("click", handleCardClick);
  } else {
    // Flip reference cards after short delay
    setTimeout(() => div.classList.add("flipped"), 100);
  }

  return div;
}

function setupGame() {
  refCardsContainer.innerHTML = "";
  cardGrid.innerHTML = "";
  resultText.textContent = "";
  greetingText.style.display = "none";
  loserText.style.display = "none";
  referenceCards = [];
  gridCards = [];
  matched = 0;
  guessCount = 0;

  const ref1 = getRandomCard();
  let ref2 = getRandomCard();
  while (ref2.value === ref1.value && ref2.suit === ref1.suit) {
    ref2 = getRandomCard();
  }

  referenceCards.push(ref1, ref2);
  referenceCards.forEach(card => {
    refCardsContainer.appendChild(createCardElement(card));
  });

  const allCards = [ref1, ref2];
  while (allCards.length < 8) {
    const newCard = getRandomCard();
    if (!allCards.some(c => c.value === newCard.value && c.suit === newCard.suit)) {
      allCards.push(newCard);
    }
  }

  const shuffled = allCards.sort(() => 0.5 - Math.random());
  shuffled.forEach((card, index) => {
    gridCards.push(card);
    cardGrid.appendChild(createCardElement(card, index, true));
  });
}

function handleCardClick(e) {
  const cardDiv = e.currentTarget;
  const index = cardDiv.dataset.index;

  if (cardDiv.classList.contains("flipped") || guessCount >= maxGuesses || matched >= 2) return;

  cardDiv.classList.add("flipped");
  guessCount++;

  const selectedCard = gridCards[index];
  const match = referenceCards.find(
    ref => ref.value === selectedCard.value && ref.suit === selectedCard.suit
  );

  if (match) {
    matched++;
    cardDiv.style.borderColor = "green";
    resultText.textContent = `✅ Match! (${matched}/2)`;
    cardDiv.removeEventListener("click", handleCardClick);
  } else {
    resultText.textContent = `❌ Not a match! (${guessCount}/${maxGuesses})`;
    setTimeout(() => {
      cardDiv.classList.remove("flipped");
    }, 1000);
  }

  if (matched === 2) {
    resultText.textContent = "🎉 You matched both cards!";
    greetingText.style.display = "block";
    disableAllCards();
  } else if (guessCount >= maxGuesses) {
    resultText.textContent += " 😢 Game Over!";
    loserText.style.display = "block";
    disableAllCards();
  }
}

function disableAllCards() {
  document.querySelectorAll(".card").forEach(card => {
    card.removeEventListener("click", handleCardClick);
  });
}

setupGame();
