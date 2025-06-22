/* ---------- Pause/Play hero video on visibility ---------- */
const heroVideo = document.getElementById('heroVideo');
if ('IntersectionObserver' in window && heroVideo) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) heroVideo.play();
        else heroVideo.pause();
      });
    },
    { threshold: 0.25 }
  );
  observer.observe(heroVideo);
}

/* ---------- Smooth-scroll offset for fixed nav ---------- */
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    const yOffset = -70; // nav height offset
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    // close mobile menu
    document.getElementById('nav-toggle').checked = false;
  });
});