document.addEventListener('DOMContentLoaded', () => {
    const documentaries = document.querySelectorAll('.documentary');
    const popupOverlay = document.getElementById('popup');
    const popupContent = document.querySelector('.popup-content');
    const closeBtn = document.querySelector('.close-btn');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const popupVideo = document.getElementById('popup-video');
    const body = document.body;
    const backButton = document.getElementById('back-button');
    const mainTitle = document.getElementById('main-title');

    // Updated descriptions and video IDs
    const documentaryData = {
        '1': {
            title: 'From Jumpstyle artist to Preacher on the street',
            description: 'The documentary follows Patrick Jumpen’s transformation from a famous jumpstyle artist to a street preacher. It delves into his rise within the jumpstyle scene, his eventual disillusionment with that life, and his spiritual awakening that led him to a new purpose—spreading his religious beliefs on the streets. The film portrays his personal journey of faith, change, and his efforts to inspire others through his newfound mission.',
            videoId: 'F31FZGZnPFY'
        },
        '2': {
            title: 'Beatboxing to the Championship',
            description: 'With more than ten years of experience, CreatifFX is out to beat the Dutch national championship in Loop Station Beatboxing.',
            videoId: 'D9Q9rHVGncs'
        },
        '3': {
            title: 'NO Resign!',
            description: 'Muriel Kloek makes her album during the 2020 lockdown',
            videoId: 'D9Q9rHVGnc'
        }
    };

    // Function to handle entrance animations
    function animateIn() {
        // Initial delay before starting fade-in
        setTimeout(() => {
            mainTitle.classList.add('visible'); // Triggers CSS transition for opacity

            // Listen for the end of the opacity transition
            mainTitle.addEventListener('transitionend', function handleTransitionEnd(event) {
                if (event.propertyName === 'opacity') { // Ensure it's the opacity transition
                    mainTitle.classList.add('title-wiggle'); // Starts wiggle animation
                    // Remove the event listener to prevent multiple triggers
                    mainTitle.removeEventListener('transitionend', handleTransitionEnd);
                }
            });
        }, 500); // initial delay before starting fade-in

        // Animate documentaries sequentially
        documentaries.forEach((doc, index) => {
            setTimeout(() => {
                doc.classList.add('visible'); // Triggers CSS transitions for opacity and transform
            }, 1000 + index * 300); // staggered delay: 1s + 0.3s per box
        });

        // Fade in back button after documentaries
        setTimeout(() => {
            backButton.classList.add('visible'); // Triggers CSS transition for opacity
        }, 1000 + documentaries.length * 300 + 500); // 1s + (0.3s * number of boxes) + 0.5s
    }

    // Call animateIn on page load
    animateIn();

    // Event listeners for documentary boxes
    documentaries.forEach((doc) => {
        doc.addEventListener('click', () => {
            const docNum = doc.getAttribute('data-doc');
            const data = documentaryData[docNum];

            if (data) {
                // Set popup content
                popupTitle.textContent = data.title;
                popupDescription.textContent = data.description;

                // Embed YouTube video
                popupVideo.innerHTML = `<iframe src="https://www.youtube.com/embed/${data.videoId}" allowfullscreen></iframe>`;

                // Activate popup overlay with blur
                popupOverlay.classList.add('active');
                body.classList.add('blurred');

                // Activate popup content
                setTimeout(() => {
                    popupContent.classList.add('active');
                }, 50);
            }
        });
    });

    // Event listener for closing popup
    closeBtn.addEventListener('click', () => {
        // Add closing class to animate popup shrinking and fading out
        popupContent.classList.add('closing');
        // Remove active class after animation
        setTimeout(() => {
            popupOverlay.classList.remove('active');
            body.classList.remove('blurred');
            popupVideo.innerHTML = ''; // Stop the video
            popupContent.classList.remove('active', 'closing');
        }, 500); // Match with the CSS transition duration
    });

    // Close popup when clicking outside content
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closeBtn.click();
        }
    });

    // Back Button Functionality
    backButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Prevent multiple clicks
        if (backButton.classList.contains('clicked')) return;
        backButton.classList.add('clicked');

        // Remove blur from background if popup is active
        if (body.classList.contains('blurred')) {
            body.classList.remove('blurred');
            popupOverlay.classList.remove('active');
            popupVideo.innerHTML = ''; // Stop the video
            popupContent.classList.remove('active', 'closing');
        }

        // Animate out the title
        mainTitle.classList.add('fade-out');

        // Animate out the documentaries sequentially
        documentaries.forEach((doc, index) => {
            setTimeout(() => {
                doc.classList.add('fade-out');
            }, index * 300); // 0.3s per box
        });

        // Slide back button left after all animations
        const totalAnimationTime = documentaries.length * 300 + 500; // 0.3s per box + 0.5s
        setTimeout(() => {
            backButton.classList.add('slide-left');
        }, totalAnimationTime);

        // Navigate to groove.html after back button slides out
        setTimeout(() => {
            window.location.href = 'groove.html';
        }, totalAnimationTime + 500); // 2s after slide-left to accommodate slower slide
    });
});