document.addEventListener("DOMContentLoaded", function () {
  // Get the carousel elements
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const carousel = document.querySelector(".carousel");
  const carouselItems = document.querySelectorAll(".carousel-item");

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

  // Header-question
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
    question.style.opacity = "1"; // Fade in the question text
  }, 500); // Delay fade-in by 500ms

  // Trigger typing effect for the answer after a delay
  setTimeout(() => {
    typeText(answer, "I specialize in mobile development. And bring Flutter-driven intuitive solutions", 100);
  }, 2500); // Start typing after 2.5s delay

  // Skills data
  const skills = [
    { skill: "Mobile Development", percentage: 70 },
    { skill: "Back-end and Database", percentage: 85 },
    { skill: "State Management", percentage: 70 },
    { skill: "Good Practices and Testing", percentage: 70 },
    { skill: "REST API", percentage: 70 },
    { skill: "Responsive Design and UX/UI", percentage: 70 },
  ];

  const skillItems = document.querySelectorAll('.skill-item');

  // Function to animate percentage from start to end
  function animatePercentage(element, start, end, duration) {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1); // 0 to 1 over duration
      const value = Math.floor(start + (end - start) * progress); // Linear interpolation
      element.textContent = `${value}%`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  skillItems.forEach((item, index) => {
    const liquid = item.querySelector('.liquid');
    const percentage = item.querySelector('.percentage');
    const skill = skills[index];

    // Set data attributes
    item.setAttribute('data-percentage', skill.percentage);
    percentage.setAttribute('data-real-percentage', skill.percentage);
    percentage.textContent = '0%'; // Default to 0%

    // Hover events
    item.addEventListener('mouseenter', () => {
      const realPercentage = parseInt(percentage.getAttribute('data-real-percentage'));
      animatePercentage(percentage, 0, realPercentage, 1500); // 1500ms = 1.5s
    });

    item.addEventListener('mouseleave', () => {
      const currentPercentage = parseInt(percentage.textContent);
      animatePercentage(percentage, currentPercentage, 0, 1500); // Smoothly drop to 0%
    });
  });

  // Pre-footer
  const projectsCount = document.getElementById("projectsCount");
  const experienceYears = document.getElementById("experienceYears");
  const clientsCount = document.getElementById("clientsCount");

  let projectsCounter = 0;
  let experienceCounter = 0;
  let clientsCounter = 0;

  // Animate the counter for projects
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

  animateCounter(projectsCount, 5);
  animateCounter(experienceYears, 2);
  animateCounter(clientsCount, 0);

  let currentIndex = 0; // Keep track of the current carousel item
  let carouselInterval; // Variable to store the setInterval function

  // Function to show the next carousel item
  function showNextItem() {
    if (currentIndex < carouselItems.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back to the first item
    }
    updateCarousel();
  }

  // Function to show the previous carousel item
  function showPrevItem() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = carouselItems.length - 1; // Loop back to the last item
    }
    updateCarousel();
  }

  // Update the carousel to display the correct item based on currentIndex
  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Start the auto-slide (function to be called when the carousel starts moving)
  function startAutoSlide() {
    carouselInterval = setInterval(showNextItem, 5000); // 5000ms = 5 seconds
  }

  // Stop the auto-slide (function to be called when the carousel is paused)
  function stopAutoSlide() {
    clearInterval(carouselInterval);
  }

  // Event listeners for the navigation buttons
  prevBtn.addEventListener("click", showPrevItem);
  nextBtn.addEventListener("click", showNextItem);

  // Auto-slide the carousel every 5 seconds
  startAutoSlide();

  // Add click event listeners to carousel items
  carouselItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      // You can change these URLs to wherever you want the carousel items to link to
      const projectUrls = [
        "/Portfolio-Chelsea/portfolio/portfolio.html", // URL for Project 1
        "/Portfolio-Chelsea/portfolio/portfolio.html", // URL for Project 2
        "/Portfolio-Chelsea/portfolio/portfolio.html",  // URL for Project 3
        "/Portfolio-Chelsea/portfolio/portfolio.html"  // URL for Project 4
      ];
      window.open(projectUrls[index], "_blank"); // Open in a new tab
    });
  });

  // Add hover functionality to stop and start the carousel movement
  carousel.addEventListener("mouseenter", stopAutoSlide); // Pause the carousel when mouse enters
  carousel.addEventListener("mouseleave", startAutoSlide); // Resume the carousel when mouse leaves

  // Carousel mobile support
  let startX = 0;
  let totalItems = document.querySelectorAll('.carousel-item').length; // Total items in the carousel

  const carouselContainer = document.querySelector('.carousel-container');

  carouselContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Get the initial touch position
  });

  carouselContainer.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX; // Get the end touch position
    if (startX - endX > 50) { // Swiped left (next slide)
      nextSlide();
    } else if (endX - startX > 50) { // Swiped right (previous slide)
      prevSlide();
    }
  });

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems; // Move to the next slide
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Move to the previous slide
    updateCarousel();
  }

  function updateCarousel() {
    const carousel = document.querySelector('.carousel');
    const offset = -currentIndex * 100; // Calculate the offset for the current slide
    carousel.style.transform = `translateX(${offset}%)`; // Move the carousel
  }
});

// Bulb lamp function
function lightUp(index) {
  const bulb = document.getElementById(`bulb${index}`);

  // Initial flicker with mixed Neon Blue and Purple
  bulb.style.boxShadow = "0 0 10px rgba(0, 224, 255, 0.5), 0 0 15px rgba(168, 85, 247, 0.5)";
  setTimeout(() => {
    // Full glow with the same mix as the card shadow
    bulb.style.boxShadow = "0 0 20px rgba(0, 224, 255, 0.8), 0 0 30px rgba(168, 85, 247, 0.8)";
  }, 100);
}

function lightOff(index) {
  const bulb = document.getElementById(`bulb${index}`);
  bulb.style.boxShadow = "none";
}