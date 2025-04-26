---
layout: project
title: Wordle Clone
description: Guess the 5‑letter word in 6 tries
date: 2025-04-20
---

<div id="game">
  <h2>Wordle Clone</h2>
  <div id="board"></div>
  <div id="message"></div>
  <div id="keys"></div>
</div>

<style>
  *,*::before,*::after{box-sizing:border-box}
  body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Helvetica,Arial,sans-serif}
  #game{max-width:320px;margin:0 auto;text-align:center}
  h2{margin:10px 0 20px}

  /* board */
  #board{display:grid;grid-template-rows:repeat(6,1fr);gap:4px;margin-bottom:12px}
  .row{display:grid;grid-template-columns:repeat(5,1fr);gap:4px}
  .tile{width:56px;height:56px;border:2px solid #d3d6da;font:24px/1 monospace;
        display:flex;align-items:center;justify-content:center;text-transform:uppercase}
  .correct{background:#6aaa64;color:#fff;border:none}
  .present{background:#c9b458;color:#fff;border:none}
  .absent {background:#787c7e;color:#fff;border:none}
  .flip{animation:flip .4s ease forwards}

  @keyframes flip{
    0%{transform:rotateX(0)}
    50%{transform:rotateX(90deg)}
    100%{transform:rotateX(0)}
  }

  /* keyboard */
  #keys{display:grid;grid-template-columns:repeat(10,1fr);gap:4px}
  .key{padding:10px 0;border:1px solid #d3d6da;border-radius:4px;cursor:pointer;
       font:14px/1 monospace;text-transform:uppercase;user-select:none}
  .key.wide{grid-column:span 2}
  .key.correct,.key.present,.key.absent{color:#fff;border:none}
  .key.correct{background:#6aaa64}
  .key.present{background:#c9b458}
  .key.absent {background:#787c7e}

  /* message */
  #message{height:22px;font-size:.9rem;color:#333;margin-bottom:6px}
</style>

<script>
let WORDS, TARGET;
const ROWS=6,COLS=5;

fetch('https://raw.githubusercontent.com/nyvyn/wordle-list/main/words')
  .then(r => r.text())
  .then(t => {
    WORDS = t.split(/\r?\n/).filter(Boolean);
    TARGET = WORDS[Math.floor(Math.random()*WORDS.length)];
    startGame();
  });

function startGame() {

const board=document.getElementById('board');
const msg  =document.getElementById('message');
const keys =document.getElementById('keys');
const KEY_ROWS=["qwertyuiop","asdfghjkl","⌫zxcvbnm⏎"];

let curRow=0,curCol=0,grid=[],rows=[];

/* build board */
for(let r=0;r<ROWS;r++){
  const row=document.createElement('div');row.className='row';rows.push(row);grid[r]=[];
  for(let c=0;c<COLS;c++){
    const t=document.createElement('div');t.className='tile';row.appendChild(t);grid[r][c]=t;
  }
  board.appendChild(row);
}

/* build keyboard */
KEY_ROWS.forEach(r=>{
  [...r].forEach(ch=>{
    const btn=document.createElement('div');
    btn.className='key'+(ch==='⌫'||ch==='⏎'?' wide':'');
    btn.textContent=ch;
    btn.onclick=()=>handleKey(ch);
    keys.appendChild(btn);
  });
});

document.addEventListener('keydown',e=>handleKey(e.key));

function handleKey(k){
  if(curRow>=ROWS)return;
  const key=k.toLowerCase();

  if(key==='backspace'||key==='⌫'){
    if(curCol>0){curCol--;grid[curRow][curCol].textContent='';}
    return;
  }
  if(key==='enter'||key==='⏎'){
    if(curCol!==COLS){show('5 letters');return;}
    const guess=rows[curRow].innerText.toLowerCase();
    if(!WORDS.includes(guess)){show('not in list');return;}
    evaluate(guess);curRow++;curCol=0;
    if(guess===TARGET){show('You win!');curRow=ROWS;return;}
    if(curRow===ROWS)show(`Answer: ${TARGET.toUpperCase()}`);
    return;
  }
  if(/^[a-z]$/.test(key)&&curCol<COLS){
    grid[curRow][curCol].textContent=key;curCol++;
  }
}

function evaluate(g){
  const freq={};[...TARGET].forEach(ch=>freq[ch]=(freq[ch]||0)+1);
  [...grid[curRow]].forEach((tile,i)=>{
    setTimeout(()=>tile.classList.add('flip'),i*100);
    const ch=g[i];
    if(ch===TARGET[i]){paint(tile,'correct');freq[ch]--;}
  });
  [...grid[curRow]].forEach((tile,i)=>{
    const ch=g[i];
    if(tile.classList.contains('correct')){tintKey(ch,'correct');return;}
    if(freq[ch]>0){paint(tile,'present');freq[ch]--;tintKey(ch,'present');}
    else{paint(tile,'absent');tintKey(ch,'absent');}
  });
}

function paint(t,cls){setTimeout(()=>t.classList.add(cls),300);}
function tintKey(ch,state){
  const btn=[...keys.children].find(b=>b.textContent===ch);
  if(!btn||btn.classList.contains('correct'))return;
  if(state==='correct'||(state==='present'&&!btn.classList.contains('present')))
    btn.className='key '+state;
}
function show(t){msg.textContent=t;setTimeout(()=>msg.textContent='',1500);}
}
</script>
