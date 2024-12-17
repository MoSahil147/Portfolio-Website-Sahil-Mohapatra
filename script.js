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
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
