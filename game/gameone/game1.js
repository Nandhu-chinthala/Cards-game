const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const valueMap = {
  "1": "A", "JACK": "J", "QUEEN": "Q", "KING": "K", "ACE": "A",
  "A": "A", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6",
  "7": "7", "8": "8", "9": "9", "10": "10", "J": "J", "Q": "Q", "K": "K"
};

const deck = [];
suits.forEach(suit => {
  values.forEach(value => {
    deck.push(`${value} of ${suit}`);
  });
});

const selectedCard = deck[Math.floor(Math.random() * deck.length)];
const [selectedValue, , selectedSuit] = selectedCard.split(" ");

const cardElement = document.getElementById("card");
const cardFront = document.getElementById("cardFront");
const cardBack = document.getElementById("cardBack");
const message = document.getElementById("message");
const hint = document.getElementById("hint");
const input = document.getElementById("guessInput");
const button = document.getElementById("guessBtn");

cardFront.style.backgroundImage = `url('./public/back.png')`;
hint.textContent = `💡 Hint: The card is from the "${selectedSuit}" suit.`;

let guessCount = 0;
let revealed = false;

function formatFileName(card) {
  const [value, , suit] = card.split(" ");
  const valueMap = { "A": "ace", "J": "jack", "Q": "queen", "K": "king" };
  const val = valueMap[value.toUpperCase()] || value;
  return `${val.toLowerCase()}_of_${suit.toLowerCase()}`;
}

function getCardImage(card) {
  return `./public/${formatFileName(card)}.png`;
}

function revealCard(card, msg) {
  cardElement.classList.add("flipped");
  cardBack.style.backgroundImage = `url('${getCardImage(card)}')`;
  message.textContent = msg;
  revealed = true;
}

function checkGuess() {
  if (revealed) return;

  const rawInput = input.value.trim().toUpperCase();
  const parts = rawInput.split(" ");
  let rawValue = parts[0];
  const rawSuit = parts[1] ? parts.slice(1).join(" ").toLowerCase() : selectedSuit.toLowerCase();
  const normalizedValue = valueMap[rawValue];

  if (!normalizedValue || !suits.includes(rawSuit)) {
    message.textContent = `⚠️ Invalid input. Use A, 2–10, J, Q, K optionally followed by suit.`;
    return;
  }

  const guess = `${normalizedValue} OF ${rawSuit}`.toUpperCase();
  const correct = selectedCard.toUpperCase();

  guessCount++;

  if (guess === correct) {
    revealCard(selectedCard, "🎉 You guessed it right!");
  } else {
    message.textContent = `❌ Wrong guess! (${guessCount}/10)`;

    if (guessCount >= 10) {
      revealCard(selectedCard, `❌ Out of attempts! The card was: ${selectedCard}`);
    }
  }
}

function restartGame() {
  location.reload();
}

input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkGuess();
  }
});

button.addEventListener("click", checkGuess);
