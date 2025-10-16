let startTime;
let timerInterval;
let gameStarted = false;
const cards = [
  '🍎', '🍎',
  '🍌', '🍌',
  '🍇', '🍇',
  '🍓', '🍓',
  '🍉', '🍉',
  '🍊', '🍊',
  '🍍', '🍍',
  '🥝', '🥝'
];

cards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('gameBoard');
let flippedCards = [];
let matched = 0;

function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');

  const inner = document.createElement('div');
  inner.classList.add('card-inner');

  const front = document.createElement('div');
  front.classList.add('card-front');
  front.textContent = '?';

  const back = document.createElement('div');
  back.classList.add('card-back');
  back.textContent = symbol;

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  card.addEventListener('click', () => {
    if (
      inner.classList.contains('flipped') ||
      flippedCards.length === 2
    ) return;

    inner.classList.add('flipped');
    flippedCards.push({ element: inner, symbol });

    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (first.symbol === second.symbol) {
        matched++;
        flippedCards = [];
        if (matched === cards.length / 2) {
    stopTimer();
    setTimeout(() => {
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 }
        });
        alert('🎉 You won the game!');
    }, 300);
}

      } else {
        setTimeout(() => {
          first.element.classList.remove('flipped');
          second.element.classList.remove('flipped');
          flippedCards = [];
        }, 1000);
      }
    }

    if (!gameStarted) {
      startTimer();
      gameStarted = true;
    }
  });

  return card;
}


function checkMatch() {
  const [first, second] = flippedCards;
  if (first.symbol === second.symbol) {
    matched += 1;
    flippedCards = [];
    if (matched === cards.length / 2) {
        if (matched === cards.length / 2) {
        stopTimer();
        setTimeout(() => alert('🎉 You won!'), 300);
     }
      setTimeout(() => alert('🎉 You won!'), 300);
    }
  } else {
    setTimeout(() => {
      first.card.classList.remove('flipped');
      second.card.classList.remove('flipped');
      first.card.querySelector('.card-content').style.display = 'none';
      second.card.querySelector('.card-content').style.display = 'none';
      flippedCards = [];
    }, 1000);
  }
}

cards.forEach(symbol => {
  const card = createCard(symbol);
  gameBoard.appendChild(card);
});
document.getElementById('restartBtn').addEventListener('click', () => {
  // Reset game state
  document.getElementById('timer').textContent = '⏱ Time: 0s';
  clearInterval(timerInterval);
  gameStarted = false;
  gameBoard.innerHTML = '';
  matched = 0;
  flippedCards = [];

  // Shuffle cards
  cards.sort(() => 0.5 - Math.random());

  // Recreate cards
  cards.forEach(symbol => {
    const card = createCard(symbol);
    gameBoard.appendChild(card);
  });
});
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').textContent = `⏱ Time: ${elapsed}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}