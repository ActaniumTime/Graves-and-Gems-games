class Ghost extends Sprite {
    constructor({ position, imageSrc, frameRate, scale = 0.1 }) {
      super({ position, imageSrc, frameRate, scale });
      this.velocity = {
        x: (Math.random() - 0.5) * 2, // Случайная скорость по оси X в диапазоне от -1 до 1
        y: (Math.random() - 0.5) * 2, // Случайная скорость по оси Y в диапазоне от -1 до 1
      };
    }
  
    update() {
      // Обновляем позицию призрака
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
  
      // Проверяем, не вышел ли призрак за границы канваса, и корректируем его положение при необходимости
      if (this.position.x <= 0) {
        this.position.x = 0;
        this.velocity.x *= -1; // Отражаем призрака от левой границы канваса
      } else if (this.position.x + this.width >= canvas.width) {
        this.position.x = canvas.width - this.width;
        this.velocity.x *= -1; // Отражаем призрака от правой границы канваса
      }
  
      if (this.position.y <= 0) {
        this.position.y = 0;
        this.velocity.y *= -1; // Отражаем призрака от верхней границы канваса
      } else if (this.position.y + this.height >= canvas.height) {
        this.position.y = canvas.height - this.height;
        this.velocity.y *= -1; // Отражаем призрака от нижней границы канваса
      }
  
      this.draw();
    }
  
    // Проверка на столкновение с игроком
    checkCollision(player) {
      return (
        this.position.x < player.position.x + player.hitbox.width &&
        this.position.x + this.width > player.position.x &&
        this.position.y < player.position.y + player.hitbox.height &&
        this.position.y + this.height > player.position.y
      );
    }
  }