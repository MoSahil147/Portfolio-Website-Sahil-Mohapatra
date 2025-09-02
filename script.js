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

/* ---------- Background audio loop (0 → 1:53) ---------- */
const audio = document.getElementById('bgAudio');
const toggleBtn = document.getElementById('audioToggle');
const END_AT = 113; // seconds
let userToggled = false;

function updateIcon() {
  toggleBtn.classList.toggle('muted', audio.muted || audio.paused);
}

audio.addEventListener('timeupdate', () => {
  if (audio.currentTime >= END_AT) {
    audio.currentTime = 0;
    audio.play().catch(()=>{});
  }
});

toggleBtn.addEventListener('click', () => {
  userToggled = true;
  audio.muted = !audio.muted;
  if (!audio.muted) audio.play().catch(()=>{});
  else audio.pause();
  updateIcon();
});

/* ---------- Enable audio after first interaction (autoplay policy) ---------- */
function armAutoplayOnce() {
  const kick = () => {
    if (!userToggled) {
      audio.muted = false;
      audio.play().catch(()=>{});
      updateIcon();
    }
    ['click','scroll','keydown','touchstart'].forEach(ev => window.removeEventListener(ev, kick));
  };
  ['click','scroll','keydown','touchstart'].forEach(ev => window.addEventListener(ev, kick));
}

window.addEventListener('DOMContentLoaded', () => {
  updateIcon();
  armAutoplayOnce();
  audio.play().catch(()=>{}); // starts muted until interaction
});