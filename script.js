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

// Smooth Scroll for Navigation Links with Offset
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Offset to account for the sticky navbar
                behavior: 'smooth'
            });
        }
    });
});

// Cursor Animation
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
});

// Hover effect for interactive elements
document.querySelectorAll('nav a, button, .project-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.backgroundColor = 'rgba(255, 0, 0, 0.7)'; // Red on hover
    });
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'rgba(255, 227, 0, 0.7)'; // Yellow default color
    });
});

// Project Cards Click Event
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const link = card.getAttribute('data-link'); // Get URL from data attribute
        if (link) {
            window.open(link, '_blank'); // Open link in new tab
        }
    });
});

// Smooth Scroll for Contact Information
document.querySelector('nav a[href="#contact"]').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});
