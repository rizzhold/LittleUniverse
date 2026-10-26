export function initSnake({ $, showToast }) {
  const canvas = $("#snake-canvas");
  const overlay = $("#snake-overlay");
  const overlayTitle = $("#snake-overlay-title");
  const overlayCopy = $("#snake-overlay-copy");
  const startBtn = $("#snake-start");
  const restartBtn = $("#snake-restart");
  const bestEl = $("#snake-best");
  const scoreEl = $("#snake-score");

  if (!canvas || !overlay || !startBtn) {
    console.warn("[snake] required elements missing");
    return;
  }

  const ctx = canvas.getContext("2d");
  const boardSize = 20;
  const bestKey = "little-universe-snake-best";
  let snake, food, direction, nextDirection, score, timer;
  let running = false;

  if (bestEl) bestEl.textContent = localStorage.getItem(bestKey) || "0";

  function roundedRect(context, x, y, w, h, r) {
    if (typeof context.roundRect === "function") {
      context.beginPath();
      context.roundRect(x, y, w, h, r);
      return;
    }
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + w, y, x + w, y + h, r);
    context.arcTo(x + w, y + h, x, y + h, r);
    context.arcTo(x, y + h, x, y, r);
    context.arcTo(x, y, x + w, y, r);
    context.closePath();
  }

  function randomFood() {
    let point;
    do {
      point = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize)
      };
    } while (snake?.some(part => part.x === point.x && part.y === point.y));
    return point;
  }

  function draw() {
    const cell = canvas.width / boardSize;
    ctx.fillStyle = "#15171a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#25282c";
    ctx.lineWidth = 1;
    for (let i = 0; i <= boardSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cell, 0);
      ctx.lineTo(i * cell, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cell);
      ctx.lineTo(canvas.width, i * cell);
      ctx.stroke();
    }
    if (food) {
      ctx.fillStyle = "#f2a58c";
      ctx.beginPath();
      ctx.arc((food.x + 0.5) * cell, (food.y + 0.5) * cell, cell * 0.31, 0, Math.PI * 2);
      ctx.fill();
    }
    snake.forEach((part, i) => {
      ctx.fillStyle = i === 0 ? "#c7f36b" : "#86b85a";
      roundedRect(ctx, part.x * cell + 2, part.y * cell + 2, cell - 4, cell - 4, i === 0 ? 7 : 5);
      ctx.fill();
    });
  }

  function reset() {
    clearInterval(timer);
    snake = [{ x: 9, y: 10 }, { x: 8, y: 10 }, { x: 7, y: 10 }];
    food = randomFood();
    direction = { x: 1, y: 0 };
    nextDirection = { ...direction };
    score = 0;
    running = false;
    if (scoreEl) scoreEl.textContent = "0";
    if (overlayTitle) overlayTitle.textContent = "Ready when you are.";
    if (overlayCopy) overlayCopy.textContent = "Use arrow keys or WASD.";
    if (startBtn) startBtn.textContent = "Start game";
    overlay.classList.remove("is-hidden");
    draw();
  }

  function tick() {
    direction = nextDirection;
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    const hitWall =
      head.x < 0 || head.y < 0 || head.x >= boardSize || head.y >= boardSize;
    const hitSelf = snake.some(p => p.x === head.x && p.y === head.y);
    if (hitWall || hitSelf) {
      endGame();
      return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      if (scoreEl) scoreEl.textContent = String(score);
      const best = Number(localStorage.getItem(bestKey) || 0);
      if (score > best) {
        localStorage.setItem(bestKey, String(score));
        if (bestEl) bestEl.textContent = String(score);
        if (showToast) showToast(`New best score: ${score}! ✳`);
      }
      food = randomFood();
    } else {
      snake.pop();
    }
    draw();
  }

  function start() {
    if (running) return;
    if (!snake) reset();
    running = true;
    overlay.classList.add("is-hidden");
    timer = setInterval(tick, 115);
  }

  function endGame() {
    clearInterval(timer);
    running = false;
    if (overlayTitle) overlayTitle.textContent = "Game over!";
    if (overlayCopy) overlayCopy.textContent = `You scored ${score}. Fancy another round?`;
    if (startBtn) startBtn.textContent = "Play again";
    overlay.classList.remove("is-hidden");
  }

  function changeDirection(dir) {
    const vectors = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 }
    };
    const v = vectors[dir];
    if (!v) return;
    if (v.x === -direction.x && v.y === -direction.y) return;
    nextDirection = v;
    if (!running && overlayTitle?.textContent === "Ready when you are.") start();
  }

  document.addEventListener("keydown", event => {
    const panel = $("#game-snake");
    if (panel && panel.hidden) return;
    const map = {
      ArrowUp: "up", w: "up", W: "up",
      ArrowDown: "down", s: "down", S: "down",
      ArrowLeft: "left", a: "left", A: "left",
      ArrowRight: "right", d: "right", D: "right"
    };
    const dir = map[event.key];
    if (dir) {
      event.preventDefault();
      changeDirection(dir);
    }
  });

  document.querySelectorAll("[data-dir]").forEach(button =>
    button.addEventListener("click", () => changeDirection(button.dataset.dir))
  );

  startBtn.addEventListener("click", () => {
    if (snake && !running && overlayTitle?.textContent === "Game over!") reset();
    start();
  });

  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      reset();
      start();
    });
  }

  reset();
}
