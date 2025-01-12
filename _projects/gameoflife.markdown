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

<div id="chatInterface" style="margin-top: 20px;">
  <!-- Chat interface will be appended here by chat.js -->
</div>

<script type="module">
  import { setupChatInterface } from "/assets/js/chat.js";
  import { setup } from "/assets/js/listener.js";
  import "/assets/js/worker.js";
  setupChatInterface('chatInterface');
  setup();
</script>

<script>
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const resolution = 10;
  canvas.width = 400;
  canvas.height = 400;
  const COLS = canvas.width / resolution;
  const ROWS = canvas.height / resolution;

  function buildGrid() {
    return new Array(COLS).fill(null)
      .map(() => new Array(ROWS).fill(null)
        .map(() => Math.floor(Math.random() * 2)));
  }

  let grid = buildGrid();

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
    grid = updateGrid(grid);
    render(grid);
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
</script>
