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

// Smooth Scroll for Navigation Links (with offset for the sticky navbar)
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Calculate the top position of the target minus 80px for the navbar
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Enable custom cursor only on devices with a fine pointer (laptops/desktops)
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const cursor = document.getElementById('cursor');
  
  // Move the custom cursor on mouse movement
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  
  // Hover effects on interactive elements
  document.querySelectorAll('nav a, .project-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.backgroundColor = 'rgba(255,0,0,0.7)'; // Red on hover
    });
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.backgroundColor = 'rgba(255,215,0,0.7)'; // Mustard yellow (FFD700) in RGBA
    });
  });
} else {
  // Remove the cursor element for devices with coarse pointers (phones/tablets)
  const cursorElem = document.getElementById('cursor');
  if (cursorElem) {
    cursorElem.parentNode.removeChild(cursorElem);
  }
}