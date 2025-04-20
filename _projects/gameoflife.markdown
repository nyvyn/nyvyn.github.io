---
layout: project
title: Game of life
description: Demonstration of emergent behavior
date: 2025-01-10
---

This is a simple demonstration of emergent behavior inspired by Conway's Game of Life.

<div style="display: flex; justify-content: center;">
  <canvas id="gameCanvas" width="400" height="400" style="border:1px solid #000000;"></canvas>
</div>

<div style="text-align: center; margin: 20px 0;">
  <label for="speedSlider">Speed: </label>
  <input type="range" id="speedSlider" min="1" max="60" value="30">
</div>

<script>
  const canvas: HTMLCanvasElement = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const resolution = 10;
  canvas.width = 400;
  canvas.height = 400;
  const COLS = canvas.width / resolution;
  const ROWS = canvas.height / resolution;

  let speed = 30;

  document.getElementById('speedSlider').addEventListener('input', function(e) {
    speed = parseInt(e.target.value, 10);
  });

  function buildGrid() {
    return new Array(COLS).fill(null)
      .map(() => new Array(ROWS).fill(null)
        .map(() => Math.floor(Math.random() * 2)));
  }

  let grid = buildGrid();
  const history = [];
  const maxHistoryLength = 10; // Limit history to the last 10 states

  function updateGrid(grid) {
    const nextGrid = grid.map(arr => [...arr]);

    for (let col = 0; col < grid.length; col++) {
      for (let row = 0; row < grid[col].length; row++) {
        const cell = grid[col][row];
        let numNeighbors = 0;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) {
              continue;
            }
            const x_cell = col + i;
            const y_cell = row + j;

            if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
              const currentNeighbor = grid[col + i][row + j];
              numNeighbors += currentNeighbor;
            }
          }
        }

        // Rules of Life
        if (cell === 1 && numNeighbors < 2) {
          nextGrid[col][row] = 0;
        } else if (cell === 1 && numNeighbors > 3) {
          nextGrid[col][row] = 0;
        } else if (cell === 0 && numNeighbors === 3) {
          nextGrid[col][row] = 1;
        }
      }
    }
    return nextGrid;
  }

  function gridsAreEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let col = 0; col < a.length; col++) {
      if (a[col].length !== b[col].length) return false;
      for (let row = 0; row < a[col].length; row++) {
        if (a[col][row] !== b[col][row]) {
          return false;
        }
      }
    }
    return true;
  }

  function render(grid) {
    for (let col = 0; col < grid.length; col++) {
      for (let row = 0; row < grid[col].length; row++) {
        const cell = grid[col][row];

        ctx.beginPath();
        ctx.rect(col * resolution, row * resolution, resolution, resolution);
        ctx.fillStyle = cell ? 'black' : 'white';
        ctx.fill();
        ctx.stroke();
      }
    }
  }

  function update() {
    const next = updateGrid(grid);
    render(grid);
    // Add current grid to history
    history.push(JSON.stringify(grid));
    if (history.length > maxHistoryLength) {
      history.shift(); // Remove the oldest state if history exceeds max length
    }

    // If grid is unchanged or matches any recent state, rebuild it to avoid getting "stuck"
    if (gridsAreEqual(next, grid) || history.includes(JSON.stringify(next))) {
      grid = buildGrid();
    } else {
      grid = next;
    }
    setTimeout(() => {
      requestAnimationFrame(update);
    }, 1000 / speed);
  }

  update();
</script>
