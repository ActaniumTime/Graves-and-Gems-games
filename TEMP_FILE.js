class Ghost extends Sprite {
  constructor({ position, imageSrc, frameRate, scale = 0.1 }) {
    super({ position, imageSrc, frameRate, scale });
    this.velocity = {
      x: (Math.random() - 0.5) * 2, // Random X velocity between -1 and 1
      y: (Math.random() - 0.5) * 2, // Random Y velocity between -1 and 1
    };
    this.width = this.image.width * scale;
    this.height = this.image.height * scale;
    this.flipped = false;
  }

  static randomizeInitialPosition() {
    // Divide the map into regions and randomly select a position in each region
    const regions = 5; // Adjust the number of regions as needed
    const regionWidth = canvas.width / (4 * regions);
    const regionHeight = canvas.height / (4 * regions);
    const xRegionIndex = Math.floor(Math.random() * regions);
    const yRegionIndex = Math.floor(Math.random() * regions);
    const x = Math.random() * regionWidth + xRegionIndex * regionWidth;
    const y = Math.random() * regionHeight + yRegionIndex * regionHeight;
    return { x, y };
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Reflect ghost from canvas edges and flip image
    if (this.position.x <= 0 || this.position.x + this.width >= canvas.width / 4) {
      this.velocity.x *= -1;
      this.flipped = !this.flipped; // Toggle flip state
    }

    if (this.position.y <= 0 || this.position.y + this.height >= canvas.height / 4) {
      this.velocity.y *= -1;
    }

    this.draw();
  }

  draw() {
    c.save();
    if (this.flipped) {
      c.translate(this.position.x + this.width, this.position.y);
      c.scale(-1, 1);
    } else {
      c.translate(this.position.x, this.position.y);
    }
    c.drawImage(this.image, 0, 0, this.width, this.height);
    c.restore();
  }

  // Collision check with player
  checkCollision(player) {
    return (
      this.position.x < player.hitbox.position.x + player.hitbox.width &&
      this.position.x + this.width > player.hitbox.position.x &&
      this.position.y < player.hitbox.position.y + player.hitbox.height &&
      this.position.y + this.height > player.hitbox.position.y
    );
  }
}
