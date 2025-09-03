/* ---------- Hero video: always playing ---------- */
const video = document.getElementById('mainVideo');
function ensureVideoPlays(){ video.muted = true; video.play().catch(()=>{}); }
window.addEventListener('DOMContentLoaded', ensureVideoPlays);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') ensureVideoPlays(); });

/* ---------- Smooth-scroll with navbar offset ---------- */
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

/* ---------- Custom cursor (desktop) ---------- */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  const hoverables = document.querySelectorAll('nav a, .project-card, .cv-anchor, .audio-toggle');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.backgroundColor = 'rgba(255,0,0,0.7)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.backgroundColor = 'rgba(255,215,0,0.7)';
    });
  });
} else {
  const cur = document.getElementById('cursor');
  if (cur) cur.remove();
}

/* ---------- Background audio loop (0 → 1:53), start UNMUTED ---------- */
const audio = document.getElementById('bgAudio');
const toggleBtn = document.getElementById('audioToggle');
const END_AT = 55; // seconds
let userMuted = false;

function updateIcon() {
  // Red slash only when actually muted
  toggleBtn.classList.toggle('muted', audio.muted);
}

audio.addEventListener('timeupdate', () => {
  if (audio.currentTime >= END_AT) {
    audio.currentTime = 0;
    audio.play().catch(()=>{});
  }
});

toggleBtn.addEventListener('click', () => {
  audio.muted = !audio.muted;
  userMuted = audio.muted;
  if (!audio.muted && audio.paused) audio.play().catch(()=>{});
  if (audio.muted && !audio.paused) audio.pause();
  updateIcon();
});

/* ---------- Try to play with sound immediately; fall back to first interaction ---------- */
function kickAudioIfNeeded() {
  if (!userMuted && (audio.paused || audio.currentTime === 0)) {
    audio.muted = false;
    audio.play().catch(()=>{});
    updateIcon();
  }
}
window.addEventListener('DOMContentLoaded', () => {
  audio.muted = false;          // start with sound ON
  audio.play().catch(()=>{});   // some browsers will block until interaction
  updateIcon();
});
['click','scroll','keydown','touchstart'].forEach(ev => {
  window.addEventListener(ev, kickAudioIfNeeded, { once: true });
});