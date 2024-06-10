let ghostsRemoved = false; // Переменная для отслеживания статуса удаления призраков

function removeGhostsForTenSeconds() {
  if (collectedCoins >= 30 && !ghostsRemoved) { // Проверяем, достаточно ли монеток и не были ли призраки уже удалены
    collectedCoins -= 30; // Уменьшаем количество монеток на 30
    totalCoins -= 30; // Уменьшаем общее количество монеток на 30
    ghostsRemoved = true; // Устанавливаем статус удаления призраков

    setTimeout(() => {
      ghostsRemoved = false; // Через 10 секунд сбрасываем статус удаления призраков
    }, 10000);
  }
}

