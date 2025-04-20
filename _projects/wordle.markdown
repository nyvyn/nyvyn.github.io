---
layout: project
title: Wordle Clone
description: Guess the 5‑letter word in 6 tries
date: 2025-04-20
---

<div style="display:flex;justify-content:center;margin:20px 0;">
  <div id="board"></div>
</div>

<div style="text-align:center;margin:10px 0;">
  <span id="message"></span>
</div>

<style>
  #board {display:grid;grid-template-rows:repeat(6,1fr);gap:4px;width:260px}
  .row   {display:grid;grid-template-columns:repeat(5,1fr);gap:4px}
  .tile  {width:48px;height:48px;border:2px solid #d3d6da;
          display:flex;align-items:center;justify-content:center;
          font:20px/1 monospace;text-transform:uppercase}
  .correct   {background:#6aaa64;color:#fff;border:none}
  .present   {background:#c9b458;color:#fff;border:none}
  .absent    {background:#787c7e;color:#fff;border:none}
</style>

<script>
  // --- config ----------------------------------------------------
  const WORDS = ["apple","grape","melon","berry","peach","mango","lemon","plums"];
  const TARGET = WORDS[Math.floor(Math.random()*WORDS.length)];
  const ROWS = 6, COLS = 5;
  // ---------------------------------------------------------------

  const board = document.getElementById('board');
  const msg   = document.getElementById('message');
  let currentRow = 0, currentCol = 0, grid = [];

  // build board
  for (let r = 0; r < ROWS; r++) {
    const row = document.createElement('div');
    row.className = 'row';
    grid[r] = [];
    for (let c = 0; c < COLS; c++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      row.appendChild(tile);
      grid[r][c] = tile;
    }
    board.appendChild(row);
  }

  function showMessage(text) {
    msg.textContent = text;
    setTimeout(() => msg.textContent = '', 1500);
  }

  function evaluateRow(guess) {
    const freq = {};
    for (const ch of TARGET) freq[ch] = (freq[ch] || 0) + 1;

    // first pass – correct
    for (let i = 0; i < COLS; i++) {
      const tile = grid[currentRow][i];
      if (guess[i] === TARGET[i]) {
        tile.classList.add('correct');
        freq[guess[i]]--;
      }
    }
    // second pass – present / absent
    for (let i = 0; i < COLS; i++) {
      const tile = grid[currentRow][i];
      if (tile.classList.contains('correct')) continue;
      const ch = guess[i];
      if (freq[ch] > 0) {
        tile.classList.add('present');
        freq[ch]--;
      } else {
        tile.classList.add('absent');
      }
    }
  }

  document.addEventListener('keydown', (e) => {
    if (currentRow >= ROWS) return; // game over
    const key = e.key.toLowerCase();

    if (key === 'backspace' && currentCol > 0) {
      currentCol--;
      grid[currentRow][currentCol].textContent = '';
      return;
    }

    if (key === 'enter') {
      if (currentCol !== COLS) { showMessage('5 letters'); return; }
      const guess = Array.from(grid[currentRow]).map(t => t.textContent.toLowerCase()).join('');
      if (!WORDS.includes(guess)) { showMessage('not in list'); return; }

      evaluateRow(guess);
      if (guess === TARGET) { showMessage('You win!'); currentRow = ROWS; return; }
      currentRow++; currentCol = 0;
      if (currentRow === ROWS) { showMessage(`Answer: ${TARGET.toUpperCase()}`); }
      return;
    }

    if (/^[a-z]$/.test(key) && currentCol < COLS) {
      grid[currentRow][currentCol].textContent = key;
      currentCol++;
    }
  });
</script>