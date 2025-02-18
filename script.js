// Video Pause/Resume on Scroll
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

// Smooth Scroll for Navigation Links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Adjust offset for sticky navbar
        behavior: 'smooth'
      });
    }
  });
});

// Cursor Animation
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Hover effect for interactive elements
document.querySelectorAll('nav a, .project-card').forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    cursor.style.backgroundColor = 'rgba(255, 0, 0, 0.7)'; // Red on hover
  });
  element.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.backgroundColor = 'rgba(255, 227, 0, 0.7)'; // Default yellow
  });
});