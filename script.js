/* ---------- Pause/Play hero video ---------- */
const video = document.getElementById('mainVideo');
let playing = true;
window.addEventListener('scroll', () => {
  if (window.scrollY > 100 && playing) { video.pause(); playing = false; }
  else if (window.scrollY <= 100 && !playing) { video.play(); playing = true; }
});

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

  // Include CV link for the hover effect
  const hoverables = document.querySelectorAll('nav a, .project-card, .cv-anchor');
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