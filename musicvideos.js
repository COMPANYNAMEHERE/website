// musicvideos.js

document.addEventListener("DOMContentLoaded", () => {
    const mainTitle = document.getElementById("main-title");
    const backButton = document.getElementById("back-button");
    const musicVideos = document.querySelectorAll(".music-video");
    const popup = document.getElementById("popup");
    const popupContent = document.querySelector(".popup-content");
    const closeButton = document.querySelector(".close-btn");
    const popupTitle = document.getElementById("popup-title");
    const popupVideo = document.getElementById("popup-video");

    // Trigger visibility of elements on page load
    setTimeout(() => {
        mainTitle.classList.add("visible");
        backButton.classList.add("visible");
        musicVideos.forEach((video, index) => {
            setTimeout(() => {
                video.classList.add("visible");
                video.style.transform = "translateY(0)";
            }, index * 200); // Stagger the animations for each video
        });
    }, 100);

    // Add click event to each music video box
    musicVideos.forEach((musicVideo) => {
        musicVideo.addEventListener("click", () => {
            const videoTitle = musicVideo.querySelector("h2").textContent;
            const videoSrc = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Placeholder video URL
            showPopup(videoTitle, videoSrc);
        });
    });

    // Show popup with video information
    function showPopup(title, videoSrc) {
        popupTitle.textContent = title;
        popupVideo.innerHTML = `<iframe src="${videoSrc}" allowfullscreen></iframe>`;
        document.body.classList.add("blurred");
        popup.classList.add("active");
        popupContent.classList.add("active");
    }

    // Close button event
    closeButton.addEventListener("click", () => {
        closePopup();
    });

    // Close popup function
    function closePopup() {
        popupContent.classList.add("closing");
        setTimeout(() => {
            popup.classList.remove("active");
            popupContent.classList.remove("active", "closing");
            document.body.classList.remove("blurred");
            popupVideo.innerHTML = "";
        }, 300);
    }

    // Back button event
    backButton.addEventListener("click", () => {
        backButton.classList.add("slide-left");
        setTimeout(() => {
            window.history.back();
        }, 500);
    });

    // Close popup when clicking outside of the content
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });
});