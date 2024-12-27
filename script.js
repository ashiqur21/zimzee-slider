const sliderContent = document.querySelector(".slider-content");
const slides = document.querySelectorAll(".slide-card");
const dots = document.querySelectorAll(".slider-dot");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const sliderContainer = document.querySelector(".sliders");

let currentSlideIndex = 0;
let autoSlideInterval;
let isAnimating = false;

// Adjust slide width dynamically
function updateSlideWidth() {
  const slideWidth = slides[0].offsetWidth;
  return slideWidth;
}

// Go to a specific slide
function goToSlide(index) {
  if (isAnimating) return;
  isAnimating = true;

  const maxIndex = slides.length - 3; // Adjust based on the number of visible slides
  currentSlideIndex = Math.max(0, Math.min(index, maxIndex));
  const translateValue = currentSlideIndex * updateSlideWidth();

  sliderContent.style.transform = `translateX(-${translateValue}px)`;
  sliderContent.style.transition = "transform 0.5s ease-in-out";

  updateActiveDot(currentSlideIndex);
  updateButtonColors();

  setTimeout(() => (isAnimating = false), 500);
}

// Update active dot
function updateActiveDot(index) {
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

// Update button colors
function updateButtonColors() {
  prevButton.style.backgroundColor = currentSlideIndex === 0 ? "#ff660000" : "#ff6600";
  nextButton.style.backgroundColor =
    currentSlideIndex >= slides.length - 3 ? "#ff660000" : "#ff6600";
}

// Slide left
function slideLeft() {
  goToSlide(currentSlideIndex - 1);
}

// Slide right
function slideRight() {
  goToSlide(currentSlideIndex + 1);
}

// Auto-slide
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    if (currentSlideIndex === slides.length - 3) {
      goToSlide(0);
    } else {
      slideRight();
    }
  }, 3000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Event listeners
prevButton.addEventListener("click", slideLeft);
nextButton.addEventListener("click", slideRight);
dots.forEach((dot) =>
  dot.addEventListener("click", () =>
    goToSlide(parseInt(dot.getAttribute("data-index")))
  )
);
window.addEventListener("resize", () => goToSlide(currentSlideIndex));
sliderContainer.addEventListener("mouseover", stopAutoSlide);
sliderContainer.addEventListener("mouseleave", startAutoSlide);

// Initialize slider
goToSlide(currentSlideIndex);
startAutoSlide();