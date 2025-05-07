var typed= new Typed(".text",{
    strings: ["Welcome To TTS Styles","You are on TTS Style.","Smart security for every home."],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


const slider = document.querySelector('.slider');
const slideTrack = document.querySelector('.slide-track');
const slides = document.querySelectorAll('.slide');

let slideWidth = slides[0].offsetWidth;
let currentIndex = 0;
let intervalId;
let isPaused = false;
let isTransitioning = false; // Add this line

function moveSlider() {
    if (!isPaused && !isTransitioning) { // Check isTransitioning
        isTransitioning = true;        // Set to true before transition
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
            slideTrack.style.transition = 'none';
            slideTrack.style.transform = `translateX(0px)`;
            requestAnimationFrame(() => {
                slideTrack.style.transition = 'transform 0.5s ease-in-out';
                slideTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            });
             setTimeout(() => {  // Add this
                isTransitioning = false;
            }, 500); // Duration of your CSS transition
        } else {
            slideTrack.style.transition = 'transform 0.5s ease-in-out';
            slideTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
             setTimeout(() => { // Add this
                isTransitioning = false;
            }, 500); // Duration of your CSS transition
        }
    }
}

function startSlider() {
    if (!intervalId) { // Prevent multiple intervals
        intervalId = setInterval(moveSlider, 1000);
    }
    isPaused = false;
}

function stopSlider() {
    clearInterval(intervalId);
    intervalId = null; // Clear the interval ID
    isPaused = true;
}

slideTrack.addEventListener('mouseenter', stopSlider);
slideTrack.addEventListener('mouseleave', startSlider);

window.addEventListener('resize', () => {
    slideWidth = slides[0].offsetWidth;
    slideTrack.style.transition = 'none';
    slideTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
});

startSlider();