// ===== VIDEO CONTROL ON SCROLL =====
const video = document.getElementById('mainVideo');
let videoPlaying = true;

window.addEventListener('scroll', () => {
  if (window.scrollY > 100 && videoPlaying) {
    video.pause();
    videoPlaying = false;
  } else if (window.scrollY <= 100 && !videoPlaying) {
    video.play();
    videoPlaying = true;
  }
});

// ===== SMOOTH SCROLL WITH OFFSET FOR STICKY NAV =====
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      const headerOffset = 80; // adjust based on your sticky nav height
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

// ===== CUSTOM CURSOR ONLY FOR DESKTOP =====
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const cursor = document.getElementById('cursor');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.querySelectorAll('nav a, .project-card').forEach(el => {
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
  const cursorElem = document.getElementById('cursor');
  if (cursorElem) cursorElem.remove();
}