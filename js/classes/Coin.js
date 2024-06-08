class Coin {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.width = 16;
    this.height = 16;
    this.image = new Image();
    this.image.src = imageSrc;
    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.onerror = () => {
      console.error('Failed to load coin image at:', imageSrc);
      this.loaded = false;
    };
  }

  draw() {
    if (this.loaded) {
      c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
  }

  update() {
    this.draw();
  }

  static getRandomPosition(canvasWidth, canvasHeight) {
    const x = Math.floor(Math.random() * (canvasWidth - 16));
    const y = Math.floor(Math.random() * (canvasHeight - 16));
    return { x, y };
  }

  static checkCollision(player, coin) {
    return (
      player.position.x < coin.position.x + coin.width &&
      player.position.x + player.width > coin.position.x &&
      player.position.y < coin.position.y + coin.height &&
      player.position.y + player.height > coin.position.y
    );
  }
}

class CoinManager {
  constructor({ canvasWidth, canvasHeight, imageSrc }) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.imageSrc = imageSrc;
    this.coins = [];
    this.collectedCoins = 0;
    this.totalCoins = 20;
  }

  addCoin() {
    if (this.collectedCoins < this.totalCoins) {
      const position = Coin.getRandomPosition(this.canvasWidth, this.canvasHeight);
      const coin = new Coin({
        position,
        imageSrc: this.imageSrc,
      });
      this.coins.push(coin);
    }
  }

  updateCoins(player, updateCoinCounter) {
    if (this.collectedCoins < this.totalCoins) {
      this.coins.forEach((coin, index) => {
        coin.update();
        if (Coin.checkCollision(player, coin)) {
          this.coins.splice(index, 1);
          this.collectedCoins++;
          updateCoinCounter(this.collectedCoins);
          this.addCoin();
        }
      });
    }
  }
}
