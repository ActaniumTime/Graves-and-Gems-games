const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 720;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36));
}

const collisionBlocks = [];
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});

const platformCollisions2D = [];
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36));
}

const platformCollisionBlocks = [];
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
          height: 4,
        })
      );
    }
  });
});

const gravity = 0.1;

const player = new Player({
  position: {
    x: 100,
    y: 300,
  },
  collisionBlocks,
  platformCollisionBlocks,
  imageSrc: './img/warrior/Idle.png',
  frameRate: 8,
  animations: {
    Idle: {
      imageSrc: './img/warrior/Idle.png',
      frameRate: 8,
      frameBuffer: 3,
    },
    Run: {
      imageSrc: './img/warrior/Run.png',
      frameRate: 8,
      frameBuffer: 5,
    },
    Jump: {
      imageSrc: './img/warrior/Jump.png',
      frameRate: 2,
      frameBuffer: 3,
    },
    Fall: {
      imageSrc: './img/warrior/Fall.png',
      frameRate: 2,
      frameBuffer: 3,
    },
    FallLeft: {
      imageSrc: './img/warrior/FallLeft.png',
      frameRate: 2,
      frameBuffer: 3,
    },
    RunLeft: {
      imageSrc: './img/warrior/RunLeft.png',
      frameRate: 8,
      frameBuffer: 5,
    },
    IdleLeft: {
      imageSrc: './img/warrior/IdleLeft.png',
      frameRate: 8,
      frameBuffer: 3,
    },
    JumpLeft: {
      imageSrc: './img/warrior/JumpLeft.png',
      frameRate: 2,
      frameBuffer: 3,
    },
  },
});

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/background.png',
});

const backgroundImageHeight = 432;

const camera = {
  position: {
    x: 0,
    y: -backgroundImageHeight + scaledCanvas.height,
  },
};

const ghosts = [];
for (let i = 0; i < 7; i++) {
  const ghost = new Ghost({
    position: {
      x: Math.random() * (canvas.width / 4),
      y: Math.random() * (canvas.height / 4),
    },
    imageSrc: './img/ghost.png',
    frameRate: 1,
  });

  ghosts.push(ghost);
}

const coinImageSrc = './img/Coin.png';
let coin = new Coin({
  position: {
    x: Math.random() * (canvas.width / 4),
    y: Math.random() * (canvas.height / 4),
  },
  imageSrc: coinImageSrc,
});
let collectedCoins = 0;

let gameOver = false;

function displayGameOver() {
  const gameOverInfo = document.createElement('div');
  gameOverInfo.classList.add('game-over-info');
  gameOverInfo.innerHTML = `
    <p>You died. Count of collectebel coins: ${collectedCoins}</p>
    <button class="restart-button" >Try again...</button>
  `;
  document.body.appendChild(gameOverInfo);

  const restartButton = gameOverInfo.querySelector('.restart-button');
  restartButton.addEventListener('click', () => {
    document.body.removeChild(gameOverInfo);
    restartGame();
  });
}

let totalCoins = 0; // Переменная для хранения общего количества монет

function restartGame() {
  gameOver = false;
  collectedCoins = 0;
  player.position = { x: 100, y: 300 };
  player.velocity = { x: 0, y: 0 };
  coin.respawn();
  ghosts.forEach(ghost => ghost.respawn()); // Сброс позиции призраков

  // Измените размер холста на правильные значения
  canvas.width = 1280;
  canvas.height = 720;

  // Сбросить позицию камеры
  camera.position = { x: 0, y: -backgroundImageHeight + scaledCanvas.height };

  animate();
  updateCoinCount(); // Обновляем отображение количества монет
}

function updateCoinCount() {
  document.getElementById('collected-coins').textContent = collectedCoins;
  document.getElementById('total-coins').textContent = totalCoins; // Общее количество монет выводится без изменений
}


function displayGameOverCoin() {
  const gameOverInfo = document.createElement('div');
  gameOverInfo.classList.add('game-over-info');
  gameOverInfo.innerHTML = `
    <p>You win! <br>
    You have ound all 20 coins!</p>
    <button class="restart-button" >Try again!</button>
  `;
  document.body.appendChild(gameOverInfo);

  const restartButton = gameOverInfo.querySelector('.restart-button');
  restartButton.addEventListener('click', () => {
    document.body.removeChild(gameOverInfo);
    restartGame();
  });
}


function animate() {
  if (gameOver == true && totalCoins !=20) {
    displayGameOver();
    return;
  }
  else{
    if(gameOver==true && totalCoins==20)
      {
        displayGameOverCoin()
        return
      }
  }

  window.requestAnimationFrame(animate);
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.scale(4, 4);
  c.translate(camera.position.x, camera.position.y);
  background.update();

  player.checkForHorizontalCanvasCollision();
  player.update();

  ghosts.forEach((ghost) => {
    ghost.update();
    if (ghost.checkCollision(player)) {
      gameOver = true;
      Console.log('DIE')
    }
  });

  coin.update();


  if (coin.checkCollision(player)) {
    collectedCoins++;
    totalCoins++; // Увеличиваем общее количество монет
    if (collectedCoins >= 20) {
      gameOver = true;
    } else {
      coin.respawn();
    }
    updateCoinCount(); // Обновляем отображение количества монет
  }

  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.switchSprite('Run');
    player.velocity.x = 2;
    player.lastDirection = 'right';
    player.shouldPanCameraToTheLeft({ canvas, camera });
  } else if (keys.a.pressed) {
    player.switchSprite('RunLeft');
    player.velocity.x = -2;
    player.lastDirection = 'left';
    player.shouldPanCameraToTheRight({ canvas, camera });
  } else if (player.velocity.y === 0) {
    if (player.lastDirection === 'right') player.switchSprite('Idle');
    else player.switchSprite('IdleLeft');
  }

  if (player.velocity.y < 0) {
    player.shouldPanCameraDown({ camera, canvas });
    if (player.lastDirection === 'right') player.switchSprite('Jump');
    else player.switchSprite('JumpLeft');
  } else if (player.velocity.y > 0) {
    player.shouldPanCameraUp({ camera, canvas });
    if (player.lastDirection === 'right') player.switchSprite('Fall');
    else player.switchSprite('FallLeft');
  }

  c.restore();
}

animate();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true;
      break;
    case 'a':
      keys.a.pressed = true;
      break;
    case 'w':
      player.velocity.y = -3.5;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const restartButton = document.querySelector('.restart-button');
  restartButton.addEventListener('click', restartGame);
});


document.getElementById('show-more-rules').addEventListener('click', function() {
  var moreRules = document.getElementById('more-rules');
  if (moreRules.classList.contains('hidden')) {
    moreRules.classList.remove('hidden');
  } else {
    moreRules.classList.add('hidden');
  }
});

