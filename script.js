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

// Select facial elements
const leftEye = document.querySelector('.left-eye');
const rightEye = document.querySelector('.right-eye');
const leftBrow = document.querySelector('.left-brow');
const rightBrow = document.querySelector('.right-brow');
const mouth = document.querySelector('.mouth');

// Eye Blinking Animation
setInterval(() => {
    leftEye.style.animation = 'blink 0.2s ease-in-out';
    rightEye.style.animation = 'blink 0.2s ease-in-out';
    setTimeout(() => {
        leftEye.style.animation = '';
        rightEye.style.animation = '';
    }, 200);
}, 4000);

// Cursor-Based Movement
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalize mouse position
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;

    // Move eyes
    leftEye.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
    rightEye.style.transform = `translate(${x * 5}px, ${y * 5}px)`;

    // Move eyebrows
    leftBrow.style.transform = `rotate(${y * -10}deg) translateY(${y * -5}px)`;
    rightBrow.style.transform = `rotate(${y * 10}deg) translateY(${y * -5}px)`;

    // Mouth movement
    mouth.style.transform = `translateY(${y * 5}px) scale(${1 + y * 0.1})`;
});