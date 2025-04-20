---
layout: project
title: Wordle Clone
description: Guess the 5‑letter word in 6 tries
date: 2025-04-20
---

<div style="text-align:center;margin:20px 0;">
  <p>Type any 5-letter word and press ENTER to submit your guess.</p>
  <p>After each guess, the tile colors will change to show how close you are:</p>
</div>

<div style="display:flex;justify-content:center;margin:20px 0;">
  <div id="board"></div>
</div>

<div style="text-align:center;margin:10px 0;">
  <span id="message"></span>
</div>

<div style="text-align:center;margin:15px 0;font-size:0.8rem;color:#666;">
  <div><span style="color:#6aaa64;font-weight:bold;">Green</span> = Correct letter in correct position</div>
  <div><span style="color:#c9b458;font-weight:bold;">Yellow</span> = Correct letter in wrong position</div>
  <div><span style="color:#787c7e;font-weight:bold;">Gray</span> = Letter not in the word</div>
</div>

<style>
  #board {display:grid;grid-template-rows:repeat(6,1fr);gap:4px;width:260px}
  .row   {display:grid;grid-template-columns:repeat(5,1fr);gap:4px}
  .tile  {width:48px;height:48px;border:2px solid #d3d6da;
          display:flex;align-items:center;justify-content:center;
          font:20px/1 monospace;text-transform:uppercase;
          background-color:#fff;color:#000}
  .active-row .tile {border:2px solid #8899aa; background-color:#f0f8ff;}
  .correct   {background:#6aaa64;color:#fff;border:none}
  .present   {background:#c9b458;color:#fff;border:none}
  .absent    {background:#787c7e;color:#fff;border:none}
</style>

<script>
  // --- config ----------------------------------------------------
  const WORDS = ["apple","grape","melon","berry","peach","mango","lemon","plums",
                "about","above","actor","acute","admit","adopt","adore","adult",
                "after","again","agent","agree","ahead","alarm","album","alert",
                "align","allow","alone","along","alter","among","anger","angle",
                "angry","ankle","apart","aptly","arise","armor","array","arrow",
                "asset","avoid","award","aware","awful","bagel","baker","banks",
                "basic","basis","beach","began","begin","begun","being","below",
                "birch","birth","black","blade","blame","blank","blast","blaze",
                "bleak","bless","blind","blink","block","blood","bloom","blues",
                "bluff","blunt","blush","board","boast","bones","boost","booth",
                "boots","bored","bound","brace","brain","brake","brand","brave",
                "bread","break","breed","bribe","brick","bride","brief","bring",
                "brink","brisk","broad","broke","brook","broom","brown","brush",
                "build","built","bulge","bunch","burst","cabin","cable","camel",
                "canal","candy","canon","cards","cargo","carry","carve","cases",
                "catch","cause","cedar","chain","chair","chalk","charm","chart",
                "chase","cheap","check","chest","chief","child","chill","choir",
                "chord","chuck","cider","cigar","civil","claim","clamp","clasp",
                "class","clean","clear","clerk","click","cliff","climb","clock",
                "close","cloth","cloud","clove","clown","coast","count","craft",
                "crane","crash","crawl","crazy","cream","creed","creek","crest",
                "cried","cross","crowd","crown","crude","cruel","crush","crust",
                "dance","dared","dated","dawn","deals","dealt","death","debit",
                "debug","debut","decal","decay","decor","decoy","delay","denim",
                "dense","depth","derby","deter","detox","diary","digit","diner",
                "dirty","disco","ditch","diver","dizzy","dodge","dogma","doing",
                "donor","dopey","doubt","dough","drank","drawl","drawn","dread",
                "dream","dress","drift","drill","drink","drive","drone","droop",
                "drove","drown","drum","drunk","dryer","dryly","dummy","dumpy",
                "dusty","dutch","dwarf","dwell","eager","eagle","early","earth",
                "eight","elbow","elder","elect","ember","empty","enact","ended",
                "endow","enemy","enjoy","enter","entry","equal","erase","erect",
                "error","essay","ether","ethic","event","every","evoke","exact",
                "exalt","excel","exert","exile","exist","expel","extra","fable",
                "faced","faces","facts","faded","fails","faint","fairy","faith",
                "false","fancy","fares","farms","fatal","fatty","fault","favor",
                "feast","feebl","feeds","feels","fence","feral","ferry","fetch",
                "fever","fiber","field","fiery","fifth","fifty","fight","final",
                "first","fizzy","flake","flame","flank","flash","flask","fleet",
                "flesh","flick","flint","float","flock","flood","floor","flora",
                "floss","flour","flown","fluid","fluke","flush","flute","foamy",
                "focus","foggy","folio","force","forge","forms","forth","forty",
                "forum","found","frame","frank","fraud","freak","fresh","front",
                "frost","frown","froze","fruit","fudge","funny","furry","fuzzy",
                "giant","given","giver","glade","gleam","glide","gloat","gloom",
                "glory","glove","glued","going","goods","goose","gorge","grace",
                "grade","graft","grain","grand","grant","grape","graph","grasp",
                "grass","grave","great","greed","green","greet","grief","grill",
                "grime","grind","groan","groom","gross","group","grove","growl",
                "grown","guard","guess","guest","guide","guild","guilt","habit",
                "hairs","hairy","halls","hands","handy","hangs","happy","hardy",
                "harsh","haste","hasty","hatch","hated","haunt","haven","havoc",
                "heads","heard","heart","heavy","hedge","hefty","hello","helps",
                "hence","herbs","heron","hinge","hints","hired","hoist","holds",
                "holes","holly","homer","homes","honey","honor","hooks","hoped",
                "hopes","horns","horse","hotel","hours","house","hover","human",
                "humid","humor","hurry","hurts","husks","husky","hydro","ideal",
                "ideas","idiot","igloo","image","inbox","incur","index","inept",
                "inert","infer","inlet","inner","input","inset","intel","inter",
                "issue","ivory","jaunt","jeans","jelly","jewel","joins","joint",
                "joker","jolly","joust","judge","juice","juicy","jumbo","jumpy",
                "junky","karat","keeps","kicks","kills","kinds","kings","kitty",
                "knack","knave","knead","kneel","knelt","knife","knock","knots",
                "known","label","lacks","lakes","lamps","lands","lanes","lapel",
                "lapse","large","laser","lasso","lasts","later","laugh","layer",
                "leads","leaks","learn","lease","leash","least","leave","ledge",
                "leech","legal","lemon","level","lever","light","liked","likes",
                "limbo","limbs","limit","lined","linen","liner","lines","lion",
                "lipid","liver","livid","llama","loads","loamy","loans","lobby",
                "local","locks","lodge","lofty","logic","loops","loose","lords",
                "lorry","loser","loses","lotte"];
  const TARGET = WORDS[Math.floor(Math.random()*WORDS.length)];
  const ROWS = 6, COLS = 5;
  // ---------------------------------------------------------------

  const board = document.getElementById('board');
  const msg   = document.getElementById('message');
  let currentRow = 0, currentCol = 0, grid = [];
  let rowElements = [];

  // build board
  for (let r = 0; r < ROWS; r++) {
    const row = document.createElement('div');
    row.className = 'row';
    rowElements.push(row);
    grid[r] = [];
    for (let c = 0; c < COLS; c++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      row.appendChild(tile);
      grid[r][c] = tile;
    }
    board.appendChild(row);
  }
  
  // Set the first row as active
  rowElements[0].classList.add('active-row');

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
