const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const blockSize = 20;
const widthInBlocks = canvas.width / blockSize;
const heightInBlocks = canvas.height / blockSize;

let snake = [{ x: Math.floor(widthInBlocks / 2), y: Math.floor(heightInBlocks / 2) }];
let food = { x: 0, y: 0 };
let direction = 'right';
let score = 0;
let gameSpeed = 100;
const scoreElement = document.getElementById('score');
const eatSound = document.getElementById('eat-sound');
const gameOverSound = document.getElementById('game-over-sound');

function drawSnake() {
  snake.forEach((block, index) => {
    ctx.fillStyle = index === 0 ? 'green' : 'lime';
    ctx.fillRect(block.x * blockSize, block.y * blockSize, blockSize, blockSize);
  });
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);
}

function placeFood() {
  food.x = Math.floor(Math.random() * widthInBlocks);
  food.y = Math.floor(Math.random() * heightInBlocks);
}

function gameLoop() {
  const head = { x: snake[0].x, y: snake[0].y };

  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }

  if (head.x < 0 || head.x >= widthInBlocks || head.y < 0 || head.y >= heightInBlocks || snake.some(block => block.x === head.x && block.y === head.y)) {
    clearInterval(gameInterval);
    gameOverSound.play();
    alert(`Game Over! Your score is ${score}.`);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
    eatSound.play();
    placeFood();
  } else {
    snake.pop();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
}

document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
});

function setDifficulty(speed) {
  clearInterval(gameInterval);
  gameSpeed = speed;
  gameInterval = setInterval(gameLoop, gameSpeed);
}

const easyBtn = document.getElementById('easy-btn');
const mediumBtn = document.getElementById('medium-btn');
const hardBtn = document.getElementById('hard-btn');

easyBtn.addEventListener('click', () => setDifficulty(200));
mediumBtn.addEventListener('click', () => setDifficulty(100));
hardBtn.addEventListener('click', () => setDifficulty(50));

placeFood();
const gameInterval = setInterval(gameLoop, gameSpeed);