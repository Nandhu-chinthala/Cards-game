 const suits = ["hearts", "diamonds", "clubs", "spades"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    const cardGrid = document.getElementById("cardGrid");
    const status = document.getElementById("status");
    const selectedCards = [];
    let matchCount = 0;
    const maxMatches = 3;
    let triesLeft = 3;

    const generateCards = () => {
      const gridCards = [];
      const usedValues = new Set();
      const usedCombos = new Set();

      while (gridCards.length < 6) {
        const value = values[Math.floor(Math.random() * values.length)];
        if (usedValues.has(value)) continue;

        const suitsShuffled = [...suits].sort(() => 0.5 - Math.random());
        const suit1 = suitsShuffled[0];
        const suit2 = suitsShuffled[1];

        gridCards.push({ value, suit: suit1 });
        gridCards.push({ value, suit: suit2 });

        usedValues.add(value);
        usedCombos.add(`${value}-${suit1}`);
        usedCombos.add(`${value}-${suit2}`);
      }

      while (gridCards.length < 9) {
        const value = values[Math.floor(Math.random() * values.length)];
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const combo = `${value}-${suit}`;
        if (!usedValues.has(value) && !usedCombos.has(combo)) {
          usedCombos.add(combo);
          gridCards.push({ value, suit });
        }
      }

      for (let i = gridCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gridCards[i], gridCards[j]] = [gridCards[j], gridCards[i]];
      }

      return gridCards;
    };

    const getCardFilename = (value, suit) => {
      const faceMap = { "A": "ace", "J": "jack", "Q": "queen", "K": "king" };
      const val = faceMap[value] || value;
      return `public/${val.toLowerCase()}_of_${suit.toLowerCase()}.png`;
    };

    const getBackImagePath = () => "public/back.png";

    let cards = generateCards();

    function createCardElement(card, index) {
      const div = document.createElement("div");
      div.className = "card";
      div.dataset.index = index;

      const frontImg = document.createElement("img");
      frontImg.className = "front";
      frontImg.src = getCardFilename(card.value, card.suit);

      const backImg = document.createElement("img");
      backImg.className = "back";
      backImg.src = getBackImagePath();

      div.appendChild(frontImg);
      div.appendChild(backImg);

      div.addEventListener("click", () => handleCardClick(div, card));

      return div;
    }

    function restartGame() {
      cardGrid.innerHTML = "";
      matchCount = 0;
      triesLeft = 3;
      selectedCards.length = 0;
      status.textContent = "Game restarted. Match 3 sets of 2 cards!";
      cards = generateCards();
      cards.forEach((card, index) => {
        const cardEl = createCardElement(card, index);
        cardGrid.appendChild(cardEl);
      });
    }

    function handleCardClick(div, card) {
      if (div.classList.contains("flipped") || selectedCards.some(obj => obj.div === div)) return;

      div.classList.add("flipped");
      selectedCards.push({ div, card });

      if (selectedCards.length === 2) {
        const [a, b] = selectedCards.map(obj => obj.card.value);
        if (a === b) {
          matchCount++;
          triesLeft = 3;
          status.textContent = `✅ Match found! Total matches: ${matchCount}`;
          selectedCards.length = 0;

          if (matchCount === maxMatches) {
            status.textContent = "🏆 You matched all 3 sets! You win!";
          }
        } else {
          triesLeft--;
          status.textContent = `❌ Not a match. Tries left for this set: ${triesLeft}`;
          setTimeout(() => {
            selectedCards.forEach(obj => obj.div.classList.remove("flipped"));
            selectedCards.length = 0;
            if (triesLeft === 0) {
              status.textContent = "😢 Out of tries! Restarting game...";
              setTimeout(restartGame, 1500);
            }
          }, 1000);
        }
      }
    }

    cards.forEach((card, index) => {
      const cardEl = createCardElement(card, index);
      cardGrid.appendChild(cardEl);
    });