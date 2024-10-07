const projects = [
    { title: "YouTube Documentaries", link: "documentaries.html" },
    { title: "Music Videos", link: "musicvideos.html" },
    { title: "Interviews", link: "new_interviews.html" },
    { title: "Photo Scanning", link: "new_photo_scanning.html" },
    { title: "Whimsical Meanderings", link: "new_whimsical_meanderings.html" }
];

const filmStrip = document.getElementById('filmStrip');
const content = document.getElementById('content');
const closeButton = document.getElementById('closeButton');
const titleText = document.getElementById('title-text');
const titleContainer = document.getElementById('title');

window.onload = () => {
    fadeInTitle();
    createButtons();
};

function fadeInTitle() {
    gsap.from(titleContainer, {
        duration: 2,
        y: -500,
        opacity: 0,
        ease: "power2.out",
    });
}

function createButtons() {
    projects.forEach((project, index) => {
        const frame = createFrame(project.title);
        frame.addEventListener('click', () => {
            gsap.to(document.querySelectorAll('.frame'), {
                duration: 1,
                y: 100,
                opacity: 0,
                ease: "power2.inOut",
                stagger: 0.1,
                onComplete: () => {
                    window.location.href = project.link;
                }
            });
        });
        // Disable hover effects during animation out
            frame.addEventListener('click', () => frame.removeEventListener('mouseenter', onMouseEnter));
            frame.addEventListener('click', () => frame.removeEventListener('mouseleave', onMouseLeave));
            addHoverEffects(frame);
        filmStrip.appendChild(frame);
        gsap.set(frame, { opacity: 0, y: -50 });
        gsap.to(frame, {
            duration: 0.5,
            y: 0,
            opacity: 1,
            delay: index * 0.4,
            ease: "power2.out",
            onComplete: () => wiggleFrame(frame),
        });
    });
}

function createFrame(title) {
    const frame = document.createElement('div');
    frame.className = 'frame';
    const textSpan = document.createElement('span');
    textSpan.className = 'frame-text';
    textSpan.textContent = title;
    frame.appendChild(textSpan);
    return frame;
}

function addHoverEffects(frame) {
    function onMouseEnter() {
        const text = frame.querySelector('.frame-text');
        gsap.to(frame, { duration: 0.3, scale: 1.05, zIndex: 10, boxShadow: '0 0 15px rgba(255,255,255,0.5)', ease: "power3.out" });
        gsap.to(text, { duration: 0.3, scale: 1.05, ease: "power2.out" });
        shakeFrame(frame);
        glitchEffect(frame);
    }
    function onMouseLeave() {
        resetAnimation(frame);
    }
    frame.addEventListener('mouseenter', onMouseEnter);
    frame.addEventListener('mouseleave', onMouseLeave);
    frame.addEventListener('mousemove', (e) => gravitate(e, frame));
    const text = frame.querySelector('.frame-text');
    frame.addEventListener('mouseenter', () => {
        gsap.to(frame, { duration: 0.3, scale: 1.05, zIndex: 10, boxShadow: '0 0 15px rgba(255,255,255,0.5)', ease: "power3.out" });
        gsap.to(text, { duration: 0.3, scale: 1.05, ease: "power2.out" });
        shakeFrame(frame);
        glitchEffect(frame);
    });
    frame.addEventListener('mouseleave', () => resetAnimation(frame));
    frame.addEventListener('mousemove', (e) => gravitate(e, frame));
}

function shakeFrame(frame) {
    // Function implementation needed
}

function glitchEffect(frame) {
    // Function implementation needed
}

function resetAnimation(frame) {
    const text = frame.querySelector('.frame-text');
    gsap.to(frame, { duration: 0.3, scale: 1, zIndex: 1, boxShadow: 'none', ease: "power3.out" });
    gsap.to(text, { duration: 0.3, scale: 1, ease: "power2.out" });
}

function wiggleFrame(frame) {
    gsap.to(frame, {
        duration: 1 + Math.random() * 0.5,
        x: gsap.utils.random(-1, 1),
        y: gsap.utils.random(-1, 1),
        ease: "sine.inOut",
        onComplete: () => wiggleFrame(frame),
    });
}

function gravitate(e, frame) {
    const rect = frame.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    gsap.to(frame.querySelector('.frame-text'), {
        duration: 0.3,
        x: (mouseX - centerX) / centerX * 5,
        y: (mouseY - centerY) / centerY * 5,
        ease: "power2.out",
    });

    gsap.to(frame, {
        duration: 0.3,
        x: (mouseX - centerX) / centerX * 10,
        y: (mouseY - centerY) / centerY * 10,
        ease: "power2.out",
    });
}

closeButton.addEventListener('click', () => {
    gsap.to(content, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            content.style.pointerEvents = 'none';
            closeButton.style.display = 'none';
        }
    });
    gsap.to(filmStrip, { opacity: 1, duration: 0.5, delay: 0.5 });
});

document.addEventListener('mousemove', (e) => {
    const rect = titleText.parentElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    gsap.to(titleText, {
        duration: 0.3,
        x: (e.clientX - centerX) / window.innerWidth * 3,
        y: (e.clientY - centerY) / window.innerHeight * 3,
        ease: "power2.out",
    });
});