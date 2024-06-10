class Ghost extends Sprite {
    constructor({ position, imageSrc, frameRate, scale = 0.1 }) {
      super({ position, imageSrc, frameRate, scale });
      this.velocity = {
        x: (Math.random() - 0.5) * 2, // Случайная скорость по оси X в диапазоне от -1 до 1
        y: (Math.random() - 0.5) * 2, // Случайная скорость по оси Y в диапазоне от -1 до 1
      };
      this.width = this.image.width * scale;
      this.height = this.image.height * scale;
      this.flipped = false;
    }
  
    update() {
      // Обновляем позицию призрака
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
  
      // Проверяем, не вышел ли призрак за границы канваса, и корректируем его положение при необходимости
      if (this.position.x <= 0) {
        this.position.x = 0;
        this.velocity.x *= -1; // Отражаем призрака от левой границы канваса
        this.flipped = !this.flipped; // Toggle flip state
      } else if (this.position.x + this.width >= canvas.width) {
        this.position.x = canvas.width - this.width;
        this.velocity.x *= -1; // Отражаем призрака от правой границы канваса
        this.flipped = !this.flipped; // Toggle flip state
      }
  
      if (this.position.y <= 0) {
        this.position.y = 0;
        this.velocity.y *= -1; // Отражаем призрака от верхней границы канваса
        this.flipped = !this.flipped; // Toggle flip state
      } else if (this.position.y + this.height >= canvas.height) {
        this.position.y = canvas.height - this.height;
        this.velocity.y *= -1; // Отражаем призрака от нижней границы канваса
        this.flipped = !this.flipped; // Toggle flip state
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


    // Проверка на столкновение с игроком
    checkCollision(player) {
      return (
        this.position.x < player.hitbox.position.x + player.hitbox.width &&
        this.position.x + this.width > player.hitbox.position.x &&
        this.position.y < player.hitbox.position.y + player.hitbox.height &&
        this.position.y + this.height > player.hitbox.position.y
      );
    }
  }