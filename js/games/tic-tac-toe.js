export function initTicTacToe({ $, showToast }) {
  const boardElement = $("#ttt-board");
  const statusEl = $("#ttt-status");
  const restartBtn = $("#ttt-restart");
  if (!boardElement) {
    console.warn("[ttt] board element missing");
    return;
  }

  const winsKey = "little-universe-ttt-record";
  let board, active, locked, record;

  try {
    record = JSON.parse(localStorage.getItem(winsKey)) || { wins: 0, losses: 0, draws: 0 };
  } catch {
    record = { wins: 0, losses: 0, draws: 0 };
  }

  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function setText(selector, value) {
    const el = $(selector);
    if (el) el.textContent = value;
  }

  function render() {
    const disabled = locked || active !== "X";
    boardElement.innerHTML = board
      .map((mark, i) => {
        const isDisabled = Boolean(mark) || disabled;
        return `<button type="button" class="ttt-cell ${mark === "O" ? "is-o" : ""}" data-cell="${i}" aria-label="Cell ${i + 1}${mark ? `, ${mark}` : ""}" ${isDisabled ? "disabled" : ""}>${mark || ""}</button>`;
      })
      .join("");
    boardElement.querySelectorAll("[data-cell]").forEach(button =>
      button.addEventListener("click", () => play(Number(button.dataset.cell)))
    );
    setText("#ttt-wins", record.wins);
    setText("#ttt-losses", record.losses);
    setText("#ttt-draws", record.draws);
  }

  function winner(state) {
    for (const line of lines) {
      if (state[line[0]] && state[line[0]] === state[line[1]] && state[line[1]] === state[line[2]]) {
        return { mark: state[line[0]], line };
      }
    }
    return null;
  }

  function finish(result) {
    locked = true;
    if (result === "X") {
      record.wins++;
      if (statusEl) statusEl.textContent = "You got it! ✳";
    } else if (result === "O") {
      record.losses++;
      if (statusEl) statusEl.textContent = "AI wins this one.";
    } else {
      record.draws++;
      if (statusEl) statusEl.textContent = "It's a draw!";
    }
    localStorage.setItem(winsKey, JSON.stringify(record));
    render();
    const win = winner(board);
    if (win) {
      win.line.forEach(i =>
        boardElement.querySelector(`[data-cell="${i}"]`)?.classList.add("winner")
      );
    }
  }

  function play(index) {
    if (locked || active !== "X" || board[index]) return;
    board[index] = "X";
    const win = winner(board);
    if (win) {
      render();
      finish("X");
      return;
    }
    if (board.every(Boolean)) {
      render();
      finish("draw");
      return;
    }
    active = "O";
    if (statusEl) statusEl.textContent = "Computer thinking…";
    render();

    window.setTimeout(() => {
      if (locked) return;
      const move = chooseMove();
      if (move !== undefined) board[move] = "O";
      const aiWin = winner(board);
      if (aiWin) {
        finish("O");
        return;
      }
      if (board.every(Boolean)) {
        finish("draw");
        return;
      }
      active = "X";
      if (statusEl) statusEl.textContent = "Your turn ✳";
      render();
    }, 320);
  }

  function chooseMove() {
    for (const mark of ["O", "X"]) {
      for (let i = 0; i < 9; i++) {
        if (!board[i]) {
          board[i] = mark;
          const wins = winner(board);
          board[i] = "";
          if (wins) return i;
        }
      }
    }
    if (!board[4]) return 4;
    const corners = [0, 2, 6, 8].filter(i => !board[i]);
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
    const rest = [1, 3, 5, 7].filter(i => !board[i]);
    return rest[Math.floor(Math.random() * rest.length)];
  }

  function reset() {
    board = Array(9).fill("");
    active = "X";
    locked = false;
    if (statusEl) statusEl.textContent = "Your turn ✳";
    render();
  }

  if (restartBtn) restartBtn.addEventListener("click", reset);
  reset();
}
