<script>
  let score = 0;
  let playing = false;
  let lastClickTime = 0;
  let timeLeft = 10;
  let timerInterval;

  const clickBtn = document.querySelector(".click-btn");
  const scoreText = document.getElementById("score");
  const timerText = document.getElementById("timer");
  const bestScoreText = document.getElementById("bestScore");

  // Load best score from browser
  let bestScore = localStorage.getItem("bestScore") || 0;
  bestScoreText.innerText = bestScore;

  function startGame() {
    if (playing) return;

    score = 0;
    timeLeft = 10;
    playing = true;
    lastClickTime = 0;

    scoreText.innerText = "Score: 0";
    timerText.innerText = "Time Left: 10s";
    clickBtn.disabled = false;

    timerInterval = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    timeLeft--;
    timerText.innerText = "Time Left: " + timeLeft + "s";

    if (timeLeft <= 0) {
      endGame();
    }
  }

  function countClick() {
    if (!playing) return;

    let now = Date.now();

    // Anti auto-clicker (too fast = cheat)
    if (now - lastClickTime < 30) {
      alert("Auto-clicker detected!");
      endGame();
      return;
    }

    lastClickTime = now;
    score++;
    scoreText.innerText = "Score: " + score;
  }

  function endGame() {
    playing = false;
    clickBtn.disabled = true;
    clearInterval(timerInterval);

    if (score > bestScore) {
      bestScore = score;
      localStorage.setItem("bestScore", bestScore);
      bestScoreText.innerText = bestScore;
      alert("NEW BEST SCORE: " + bestScore);
    } else {
      alert("Your score: " + score);
    }
  }
</script>
