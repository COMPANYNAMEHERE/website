function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

document.addEventListener("mousemove", debounce((event) => {
    const pupils = document.querySelectorAll("#left-pupil, #right-pupil");
    const eyes = document.querySelectorAll(".eye");

    if (pupils.length !== 2) {
        console.error("Pupil elements not found");
        return;
    }

    const eyeRects = Array.from(eyes).map(eye => eye.getBoundingClientRect());

    eyes.forEach((eye, index) => {
        const rect = eyeRects[index];
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        const deltaX = event.clientX - eyeCenterX;
        const deltaY = event.clientY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(eye.offsetWidth / 3, Math.hypot(deltaX, deltaY) / 8); // Increased eye movement
        const pupil = eye.querySelector(".pupil");

        if (!pupil) {
            console.error("Pupil element not found in eye");
            return;
        }

        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;

        pupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
}, 10));

document.addEventListener("click", () => {
    const eyes = document.querySelectorAll(".eye");
    eyes.forEach(eye => {
        eye.classList.add("blink");
        setTimeout(() => {
            eye.classList.remove("blink");
        }, 300);
    });
});