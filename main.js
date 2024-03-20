document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jump();
  }
});

function jump() {
  let dinosaur = document.querySelector(".dinosaur");
  dinosaur.style.bottom = "100px";
  setTimeout(function () {
    dinosaur.style.bottom = "0";
  }, 300);
  let isPlaying = false;
  let score = 0;

  document.getElementById("playAgain").addEventListener("click", function () {
    resetGame();
  });

  function startGame() {
    isPlaying = true;
    document.querySelector(".game-container").style.display = "block";
    animateObstacle(); // Начать движение препятствий
  }

  function animateObstacle() {
    let obstacle = document.querySelector(".obstacle");
    obstacle.style.right = "0"; // Установка начальной позиции препятствия
    obstacle.style.animation = "obstacleMove 1s infinite linear"; // Старт анимации движения препятствия
  }

  document.addEventListener("keydown", function (event) {
    if (isPlaying && event.code === "Space") {
      jump();
    }
  });

  function jump() {
    let dinosaur = document.querySelector(".dinosaur");
    dinosaur.style.bottom = "100px";
    setTimeout(function () {
      dinosaur.style.bottom = "0";
    }, 300);
  }

  let gameContainer = document.querySelector(".game-container");

  function checkCollision() {
    let dinosaur = document.querySelector(".dinosaur");
    let dinoRect = dinosaur.getBoundingClientRect();
    let obstacle = document.querySelector(".obstacle"); // Обновляем ссылку на препятствие
    let obstacleRect = obstacle.getBoundingClientRect();

    if (
      dinoRect.bottom >= obstacleRect.top &&
      dinoRect.left <= obstacleRect.right &&
      dinoRect.right >= obstacleRect.left
    ) {
      endGame();
    } else if (obstacleRect.right < dinoRect.left) {
      increaseScore();
    }
  }

  function increaseScore() {
    score++;
    document.getElementById("score").innerText = "Счет: " + score;
  }

  function endGame() {
    isPlaying = false;
    document.getElementById("playAgain").style.display = "block";
    document.getElementById("endMessage").innerText =
      "Игра окончена. Ваш счет: " + score;
    document.getElementById("endMessage").style.display = "block";
    let obstacle = document.querySelector(".obstacle");
    obstacle.style.animation = "none"; // Остановка анимации препятствия
  }

  function resetGame() {
    isPlaying = true;
    score = 0;
    document.getElementById("score").innerText = "Счет: " + score;
    document.getElementById("playAgain").style.display = "none";
    document.getElementById("endMessage").style.display = "none";
    animateObstacle(); // Начать движение препятствий заново
  }

  setInterval(checkCollision, 50); // Проверка коллизий каждые 50ms
}
