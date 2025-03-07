
document.addEventListener('DOMContentLoaded', function() {
    // Intro text and image animation
    const introText = document.querySelector('.intro-text');
    const introImage = document.querySelector('.intro-image');

    function addVisibleClass() {
        setTimeout(() => {
            introText.classList.add('visible');
            introImage.classList.add('visible');
        }, 200); // Add a slight delay to ensure the elements are rendered
    }

    addVisibleClass(); // Add the visible class on page load

    // About Me content visibility check
    const aboutMeContent = document.querySelector('.aboutMe-content');
    const aboutMeHeading = document.querySelector('.aboutMe h1');


    function checkVisibility() {
        const rect = aboutMeContent.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

        if (rect.top <= windowHeight && rect.bottom >= 0) {
            aboutMeContent.classList.add('visible');
            aboutMeHeading.classList.add('visible');
        }
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Check visibility on page load
    // Popular Video Series visibility check
    const videosHeading = document.querySelector('.videos h1');
    const videoItems = document.querySelectorAll('.video-item');

    function checkVideosVisibility() {
        const rect = videosHeading.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

        if (rect.top <= windowHeight * 0.75 && rect.bottom >= windowHeight * 0.25) {
            videosHeading.classList.add('visible');
            videoItems.forEach(item => item.classList.add('visible'));
        }
    }

    window.addEventListener('scroll', checkVideosVisibility);
    checkVideosVisibility(); // Check visibility on page load
    
});