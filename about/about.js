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
});