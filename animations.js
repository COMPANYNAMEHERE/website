const projects = [
    { title: "Short Film", description: "A coming-of-age story set in a dystopian future." },
    { title: "Music Video", description: "An experimental visual journey through sound." },
    { title: "Documentary", description: "Exploring the hidden world of urban beekeeping." },
    { title: "Animation", description: "A hand-drawn tale of friendship between unlikely creatures." },
    { title: "Interactive Art", description: "A web-based experience blending film and user input." }
];

const filmStrip = document.getElementById('filmStrip');
const content = document.getElementById('content');
const projectContent = document.getElementById('projectContent');
const closeButton = document.getElementById('closeButton');
const titleText = document.getElementById('title-text');
const titleContainer = document.getElementById('title');

window.onload = () => {
    fadeInTitle();
    fadeInButtons();
};

function fadeInTitle() {
    gsap.from(titleContainer, {
        duration: 1.5, // Slowed down the title animation
        y: -50,
        opacity: 0,
        ease: "power2.out",
    });
}

function fadeInButtons() {
    const buttons = document.querySelectorAll('.frame');
    buttons.forEach((button, index) => {
        gsap.from(button, {
            duration: 0.5,
            y: -50,
            opacity: 0,
            delay: index * 0.4, // Adjust the delay to space out the button animations
            ease: "power2.out",
        });
    });
}

projects.forEach((project, index) => {
    const frame = document.createElement('div');
    frame.className = 'frame';
    const textSpan = document.createElement('span');
    textSpan.className = 'frame-text';
    textSpan.textContent = project.title;
    frame.appendChild(textSpan);
    frame.addEventListener('click', () => showProject(index));
    frame.addEventListener('mouseenter', () => enhancedHoverEffect(frame));
    frame.addEventListener('mouseleave', () => resetAnimation(frame));
    frame.addEventListener('mousemove', (e) => gravitateText(e, textSpan, frame));
    filmStrip.appendChild(frame);
});

function wiggleFrame(frame) {
    const duration = 2 + Math.random();
    const xMovement = gsap.utils.random(-10, 10);
    const yMovement = gsap.utils.random(-10, 10);

    gsap.to(frame, {
        duration: duration,
        x: xMovement,
        y: yMovement,
        ease: "sine.inOut",
        onComplete: () => wiggleFrame(frame)
    });
}

function enhancedHoverEffect(frame) {
    gsap.to(frame, {
        duration: 0.3,
        scale: 1.2,
        zIndex: 10,
        boxShadow: '0 0 20px rgba(255,255,255,0.5)',
        ease: "power2.out",
    });

    const glitchDuration = 0.05;
    const glitchRepeats = 10;

    for (let i = 0; i < glitchRepeats; i++) {
        gsap.to(frame, {
            duration: glitchDuration,
            x: gsap.utils.random(-15, 15),
            y: gsap.utils.random(-15, 15),
            skewX: gsap.utils.random(-10, 10),
            skewY: gsap.utils.random(-10, 10),
            opacity: gsap.utils.random(0.7, 1),
            delay: i * glitchDuration * 2,
            ease: "power1.inOut",
        });

        gsap.to(frame, {
            duration: glitchDuration,
            x: 0,
            y: 0,
            skewX: 0,
            skewY: 0,
            opacity: 1,
            delay: (i * glitchDuration * 2) + glitchDuration,
            ease: "power1.inOut",
            onComplete: () => {
                gsap.set(frame, {
                    x: 0,
                    y: 0,
                    skewX: 0,
                    skewY: 0,
                });
            }
        });
    }
}

function resetAnimation(frame) {
    gsap.to(frame, {
        duration: 0.3,
        scale: 1,
        zIndex: 1,
        boxShadow: 'none',
        x: 0,
        y: 0,
        skewX: 0,
        skewY: 0,
        opacity: 1,
        ease: "power2.out",
        onComplete: () => {
            gsap.set(frame, {
                x: 0,
                y: 0,
                skewX: 0,
                skewY: 0,
            });
            wiggleFrame(frame); 
        }
    });
    gsap.to(frame.querySelector('.frame-text'), {
        duration: 0.3,
        x: 0,
        y: 0,
    });
}

function gravitateText(e, textElement, frame) {
    const rect = frame.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const maxDistanceButton = 30;  
    const maxDistanceText = 10; 

    const distanceXButton = (mouseX - centerX) / centerX * maxDistanceButton;
    const distanceYButton = (mouseY - centerY) / centerY * maxDistanceButton;

    gsap.to(textElement, {
        duration: 0.3,
        x: (mouseX - centerX) / centerX * maxDistanceText,
        y: (mouseY - centerY) / centerY * maxDistanceText,
        ease: "power2.out",
    });

    gsap.to(frame, {
        duration: 0.3,
        x: distanceXButton,
        y: distanceYButton,
        ease: "power2.out",
    });
}

function showProject(index) {
    const project = projects[index];
    projectContent.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <img src="/api/placeholder/400/300" alt="${project.title} placeholder">
    `;
    gsap.to(filmStrip, { opacity: 0, duration: 0.5 });
    gsap.to(content, { opacity: 1, duration: 0.5, delay: 0.5, onComplete: () => {
        content.style.pointerEvents = 'auto';
        closeButton.style.display = 'block';
    }});
}

closeButton.addEventListener('click', () => {
    gsap.to(content, { opacity: 0, duration: 0.5, onComplete: () => {
        content.style.pointerEvents = 'none';
        closeButton.style.display = 'none';
    }});
    gsap.to(filmStrip, { opacity: 1, duration: 0.5, delay: 0.5 });
});

document.addEventListener('mousemove', (e) => {
    const rect = titleText.parentElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const maxDistance = 10; 
    const distanceX = (e.clientX - centerX) / window.innerWidth * maxDistance;
    const distanceY = (e.clientY - centerY) / window.innerHeight * maxDistance;

    gsap.to(titleText, {
        duration: 0.3,
        x: distanceX,
        y: distanceY,
        ease: "power2.out",
    });
});