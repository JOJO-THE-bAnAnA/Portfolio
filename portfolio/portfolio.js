document.addEventListener("DOMContentLoaded", function () {
    // Header name/logo style
    let textContainer = document.querySelector(".text-container");
    let logo = document.querySelector(".header-logo");
    let isTextVisible = true;

    setInterval(() => {
        if (isTextVisible) {
            textContainer.style.opacity = "0"; // Hide text
            setTimeout(() => {
                logo.style.opacity = "1"; // Show logo after text disappears
            }, 1000); // Increased delay for smoother transition
        } else {
            logo.style.opacity = "0"; // Hide logo
            setTimeout(() => {
                textContainer.style.opacity = "1"; // Show text after logo disappears
            }, 1000); // Increased delay for smoother transition
        }
        isTextVisible = !isTextVisible;
    }, 5000); // Slower loop cycle (5s instead of 3s)

    // Header typing animation
    const question = document.querySelector('.fade-in-text');
    const answer = document.querySelector('.typing-text');

    // Function to simulate typing effect
    function typeText(element, text, speed) {
        let i = 0;
        element.style.opacity = "1"; // Fade in immediately

        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i); // Add one character
                i++;
            } else {
                clearInterval(interval); // Stop when done
                element.style.borderRight = "none"; // Remove cursor
            }
        }, speed);
    }

    // Trigger fade-in of the question text after page load
    setTimeout(() => {
        if (question) question.style.opacity = "1"; // Fade in the question text
    }, 500); // Delay fade-in by 500ms

    // Trigger typing effect for the answer after a delay
    setTimeout(() => {
        if (answer) typeText(answer, "I specialize in mobile development. And bring Flutter-driven intuitive solutions", 100);
    }, 2500); // Start typing after 2.5s delay

    // Pre-footer counters
    const projectsCount = document.getElementById("projectsCount");
    const experienceYears = document.getElementById("experienceYears");
    const clientsCount = document.getElementById("clientsCount");

    // Animate the counter for pre-footer stats
    const animateCounter = (element, target) => {
        let counter = 0;
        const interval = setInterval(() => {
            if (counter >= target) {
                clearInterval(interval);
            } else {
                counter++;
                element.textContent = counter;
            }
        }, 30);
    };

    // Only run counters if elements exist
    if (projectsCount) animateCounter(projectsCount, 5);
    if (experienceYears) animateCounter(experienceYears, 2);
    if (clientsCount) animateCounter(clientsCount, 0);

    // Portfolio letter toggle with GitHub links and video
    const letters = document.querySelectorAll(".project-letter");
    const video = document.getElementById("showcase-video");
    let videoSource = null; // Initialize as null

    // Check if video element exists before querying for source
    if (video) {
        videoSource = video.querySelector("source");
    }

    // GitHub URLs for each project
    const projectUrls = [
        "https://github.com/seniamara/Atm-Navegao", // Eletro Store (update as needed)
        "https://github.com/seniamara/Atm-Navegao", // Atm-Navegao
        "https://github.com/seniamara/app-afirma-es", // App-Afirma-ES
        "https://github.com/seniamara/bitcoin-app", // Bitcoin-App
        "#", // Placeholder for Project 5
        "#", // Placeholder for Project 6
        "#"  // Placeholder for Project 7
    ];

    letters.forEach((letter, index) => {
        const front = letter.querySelector(".letter-front");
        const closeBtn = letter.querySelector(".close-btn");
        const githubLink = letter.querySelector(".github-link");

        // Open letter and show video
        front.addEventListener("click", function (e) {
            e.stopPropagation();
            letters.forEach(l => l.classList.remove("open")); // Close all other letters
            letter.classList.add("open");
            
            if (githubLink) {
                githubLink.href = projectUrls[index];
            }

            const videoPath = letter.getAttribute("data-video");
            if (video && videoSource && videoPath) { // Check if video and videoSource exist
                videoSource.setAttribute("src", videoPath);
                video.load();
                video.classList.add("active");
            } else if (video) { // If video exists but no path or source, hide it
                video.classList.remove("active");
                if (videoSource) videoSource.setAttribute("src", "");
            }
        });

        // Close letter and hide video
        closeBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            letter.classList.remove("open");
            if (video) {
                video.classList.remove("active");
                video.pause();
            }
        });

        // Close letter when clicking outside
        document.addEventListener("click", function (e) {
            if (!letter.contains(e.target) && letter.classList.contains("open")) {
                letter.classList.remove("open");
                if (video) {
                    video.classList.remove("active");
                    video.pause();
                }
            }
        });
    });
});