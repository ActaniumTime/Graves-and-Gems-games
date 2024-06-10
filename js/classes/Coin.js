class Coin {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.width = 16;
    this.height = 16;
    this.collected = false;
    this.spawnTime = Date.now();
    this.lifetime = 20000; // 20 секунд
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    if (Date.now() - this.spawnTime > this.lifetime) {
      this.respawn();
    }
  }

  checkCollision(player) {
    return (
      player.hitbox.position.x < this.position.x + this.width &&
      player.hitbox.position.x + player.hitbox.width > this.position.x &&
      player.hitbox.position.y < this.position.y + this.height &&
      player.hitbox.position.y + player.hitbox.height > this.position.y
    );
  }

  respawn() {
    this.position = {
      x: Math.random() * (canvas.width /2 - this.width),
      y: Math.random() * (canvas.height /2- this.height),
    };
    this.spawnTime = Date.now();
  }
}
