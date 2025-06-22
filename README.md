# 🎮 Card Games Collection Project

A fun and interactive web-based card game collection built with **HTML**, **CSS**, and **JavaScript**. This project includes multiple mini-games where players guess or match real playing cards with engaging visuals and flip animations.

---

## 📁 Folder Structure

project-folder/
├── index.html # Home page with game selection
├── game1.html # Game 1: Guess the Hidden Card
├── game2.html # Game 2: Match the Card
├── game3.html # Game 3: Match Three Sets
├── game1.js # JS for Game 1
├── game2.js # JS for Game 2
├── game3.js # JS for Game 3
├── game1.css # CSS for Game 1
├── game2.css # CSS for Game 2
├── game3.css # CSS for Game 3
├── public/ # Folder containing card images
│ ├── ace_of_spades.png
│ ├── king_of_hearts.png
│ ├── ... (all 52 card images)
│ └── card_back.png # Common back image for all cards

---

## 🕹️ Game Descriptions

### 🎯 Game 1: Guess the Hidden Card

- **Goal**: Guess the value of a face-down card.
- **Mechanics**:
  - One card is randomly selected and flipped face-down.
  - Player types their guess (e.g., `A spades`, `10 hearts`, `K diamonds`).
  - After 10 attempts or a correct guess, the card is revealed.
  - Input is normalized (e.g., `"j clubs"` → `J_of_clubs`) for comparison.

### 🃏 Game 2: Match the Card

- **Goal**: Match one of two shown cards by flipping hidden cards.
- **Mechanics**:
  - Two reference cards are visible.
  - 9 face-down cards are displayed; some match the reference cards.
  - Players flip cards to find matches.
  - Matches are highlighted; unmatched cards flip back.

### 🧠 Game 3: Match Three Sets

- **Goal**: Match 3 sets of 2 identical-value cards (e.g., two `5`s).
- **Mechanics**:
  - 9 cards face-down with 3 correct matching pairs hidden.
  - Each set gives only 3 tries to match.
  - Failing to match within attempts restarts the game.
  - Successfully matching all 3 sets results in a win animation.

---

## 💻 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Assets**: Real-time card images stored in the `public/` folder
- **Responsive**: Mobile-friendly layout using flexbox and media queries

---

## 🖼️ How to Add Card Images

- Place all card images inside the `public/` folder.
- File naming convention:  
  - `ace_of_spades.png`  
  - `2_of_hearts.png`  
  - `king_of_diamonds.png`  
- Backside image: `card_back.png`

You can download free card images from [OpenClipart](https://openclipart.org/) or [Deck of Cards API](https://deckofcardsapi.com/).

---

## 📱 Features

- Realistic card images
- Flip animation with smooth transitions
- Interactive inputs and feedback
- Game restart button and status display
- Hints and attempts tracking
- Works on desktop and mobile

---

## 🧪 How to Run

1. Clone or download the project folder.
2. Make sure all `.html`, `.css`, and `.js` files are in the root.
3. Add a `public/` folder and store all the card images inside.
4. Open `index.html` in your browser.

---

## 🎨 Future Improvements

- Add background music and sound effects
- High score tracking
- Animated celebration on winning
- Timer-based challenges

---

## 🙌 Acknowledgments

- Playing card images from open sources.
- Flip animations inspired by modern CSS tricks.

---

Enjoy playing the card games and feel free to expand the collection! ♠️♥️♣️♦️
