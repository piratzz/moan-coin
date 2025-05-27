
let marketCap = 0;
let moanCounter = 0;
let lastMilestone = 0;
let specialPlaying = false;

function stopSpecialMoans() {
  ['moan50k', 'moan100k'].forEach(id => {
    const audio = document.getElementById(id);
    audio.pause();
    audio.currentTime = 0;
  });
}

function playMoan(audioId, from = 0, to = null, isSpecial) {
  const audio = document.getElementById(audioId);
  if (audio) {
    audio.currentTime = from;
    audio.play();
    if (to) {
      const duration = (to - from) * 1000;
      setTimeout(() => {
        audio.pause();
        if (isSpecial) specialPlaying = false;
      }, duration);
    }
  }
}

function manualMoan() {
  playMoan('moan1');
  setTimeout(() => {
    window.location.href = 'https://pump.fun';
  }, 800);
}

function updateChartAndCap() {
  marketCap += 2000;
  document.getElementById('capDisplay').textContent = marketCap.toLocaleString();

  let triggered = false;
  for (let cap = lastMilestone + 1; cap <= marketCap; cap++) {
    if (cap % 100000 === 0) {
      stopSpecialMoans();
      specialPlaying = true;
      playMoan('moan100k', 0, 60, true);
      lastMilestone = cap;
      triggered = true;
      break;
    } else if (cap % 50000 === 0) {
      stopSpecialMoans();
      specialPlaying = true;
      playMoan('moan50k', 3, 30, true);
      lastMilestone = cap;
      triggered = true;
      break;
    }
  }

  if (!triggered && !specialPlaying) {
    for (let cap = lastMilestone + 1; cap <= marketCap; cap++) {
      if ((cap < 100000 && cap % 5000 === 0) || (cap > 100000 && cap % 10000 === 0)) {
        moanCounter++;
        playMoan(moanCounter % 2 === 0 ? 'moan1' : 'moan2');
        lastMilestone = cap;
        break;
      }
    }
  }
}

setInterval(updateChartAndCap, 2000);
